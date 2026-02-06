# Plan: Accept Pre-existing Access Key in `connect`

## Context

The `webAuthn` connector generates a new `WebCryptoP256` keypair during `connect` when `grantAccessKey` is enabled. This happens in three code paths inside `connect`:

1. **Sign-up** (L141-144) — `WebCryptoP256.createKeyPair()`
2. **Reconnect with stored credential** (L158-164) — loads from IndexedDB
3. **Discover credential** (L183-186) — `WebCryptoP256.createKeyPair()`

`grantAccessKey` is connect-time only. Resolved once at connector creation (L46-51), consumed only in `connect()`. No other lifecycle method generates keys.

## Goal

Allow callers to pass an **existing access key `address` and `expiry`** into `connect` so the connector authorizes that key (via the root WebAuthn account) instead of generating a new keypair. The keypair was created in another system — the connector doesn't need local signing capability for the access key.

## Design

### 1. Extend `connect` parameters type

Add optional `accessKey` to the `Properties` connect signature (L55-74):

```ts
connect<withCapabilities extends boolean = false>(parameters: {
  // ... existing params ...
  accessKey?: {
    address: Address.Address
    expiry: number
  } | undefined
}): Promise<{ accounts: readonly Address.Address[]; chainId: number }>
```

### 2. Modify the discover credential flow (L180-236)

This is the primary code path affected. When `parameters.accessKey` is provided:

- **Skip keypair generation** — don't call `WebCryptoP256.createKeyPair()`
- **Use provided address directly** in `KeyAuthorization.from()` instead of deriving from `keyPair.publicKey`
- **Use provided expiry** instead of `accessKeyOptions.expiry`
- **Still construct the `keyAuthorization_unsigned`** and fold its hash into `WebAuthnP256.getCredential()` so the user's WebAuthn gesture authorizes the external key

```ts
const { hash, keyAuthorization_unsigned } = await (async () => {
  // If external access key provided, use its address + expiry directly
  if (parameters.accessKey) {
    const keyAuthorization_unsigned = KeyAuthorization.from({
      ...accessKeyOptions,
      address: parameters.accessKey.address,
      expiry: parameters.accessKey.expiry,
      type: 'p256',
    })
    const hash = KeyAuthorization.getSignPayload(keyAuthorization_unsigned)
    return { keyAuthorization_unsigned, hash }
  }
  if (!keyPair) return { accessKeyAddress: undefined, hash: undefined }
  const accessKeyAddress = Address.fromPublicKey(keyPair.publicKey)
  // ... existing logic
})()
```

### 3. Modify the sign-up flow (L118-147)

Same pattern — when `parameters.accessKey` is provided, skip `WebCryptoP256.createKeyPair()` and return `keyPair: undefined`. The key authorization will be handled in the provisioning block.

```ts
const keyPair = await (async () => {
  if (!accessKeyOptions && !parameters.accessKey) return undefined
  if (parameters.accessKey) return undefined  // external key, no local pair
  return await WebCryptoP256.createKeyPair()
})()
```

### 4. Modify the provisioning block (L252-296)

When `parameters.accessKey` is provided, `keyPair` will be `undefined` so the existing `if (keyPair)` guard (L252) would skip provisioning. We need a parallel path:

```ts
if (parameters.accessKey) {
  // No local accessKey account — external system handles signing.
  // But we still need to store the pending key authorization so the
  // first transaction from the root account includes it on-chain.
  const keyAuth = keyAuthorization ??
    (await account.signKeyAuthorization(
      { address: parameters.accessKey.address },
      { ...accessKeyOptions, expiry: parameters.accessKey.expiry },
    ))

  await config?.storage?.setItem(
    `pendingKeyAuthorization:${account.address.toLowerCase()}`,
    keyAuth,
  )
} else if (keyPair) {
  // ... existing logic (L252-296)
}
```

Note: `accessKey` (the local account variable) remains `undefined`. This means `getClient()` (L365-393) will use the root `account` for signing, which is correct — the external system signs with the access key, not this connector.

### 5. Handle `grantAccessKey` interaction

Currently, if `grantAccessKey` is falsy, `accessKeyOptions` is `undefined` and all access key code paths are skipped via guards like `if (!accessKeyOptions) return undefined`.

When `parameters.accessKey` is provided, the connector **must** enter the key authorization flow regardless of `grantAccessKey`. The connect-time `accessKey` param is a standalone opt-in — `grantAccessKey` is not a prerequisite.

In each branch, change guards from:
```ts
if (!accessKeyOptions) return undefined
```
to:
```ts
if (!accessKeyOptions && !parameters.accessKey) return undefined
```

And in the provisioning block, when `parameters.accessKey` is present but `accessKeyOptions` is `undefined`, use the expiry from `parameters.accessKey` directly (don't read from `accessKeyOptions`).

### 6. No changes to `actions/connect.ts`

`ConnectParameters` infers from the connector's `connect` method signature (L24-36) and the spread at L117-118 forwards all params. The new `accessKey` field flows through automatically.

## Files to modify

| File | Change |
|------|--------|
| `packages/core/src/tempo/Connectors.ts` | Add `accessKey` to connect params type, skip keypair generation when provided, use provided address/expiry for key authorization, store pending authorization, adjust `accessKeyOptions` guards |

## Behavior summary

| Scenario | Keypair generated? | Key authorization signed? | `accessKey` account set? | Signing account in `getClient` |
|---|---|---|---|---|
| `grantAccessKey` enabled, no `accessKey` param | Yes (WebCryptoP256) | Yes (root signs) | Yes | Access key account |
| `accessKey` param provided, `grantAccessKey` enabled | No | Yes (root signs, using provided address/expiry) | No | Root account |
| `accessKey` param provided, `grantAccessKey` **not** enabled | No | Yes (root signs, using provided address/expiry) | No | Root account |
| Neither | No | No | No | Root account |

## Verified: `account.signKeyAuthorization` signature

`RootAccount.signKeyAuthorization` accepts `Pick<AccessKeyAccount, 'accessKeyAddress' | 'keyType'>` — just `{ accessKeyAddress: Address, keyType: SignatureEnvelope.Type }`. No full account needed. For the external key case:

```ts
account.signKeyAuthorization(
  { accessKeyAddress: parameters.accessKey.address, keyType: 'p256' },
  { expiry: parameters.accessKey.expiry },
)
```

This is called in the provisioning block. The discover credential flow (L190-236) constructs the `KeyAuthorization` and hash differently (manually, to fold into the WebAuthn gesture), but uses the same address — just substitute `parameters.accessKey.address` for `Address.fromPublicKey(keyPair.publicKey)`.
