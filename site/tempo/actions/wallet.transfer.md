# `wallet.transfer`

Transfers a TIP-20 token.

This action invokes the `wallet_transfer` JSON-RPC method on the connected wallet.

## Usage

::: code-group

```ts [example.ts]
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { receipt } = await Actions.wallet.transfer(config, {
  amount: '1.5',
  to: '0x20c0000000000000000000000000000000000001',
  token: 'pathUSD',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Editable mode

By default, `wallet.transfer` submits the transfer without showing an editable UI.

Pass `editable: true` to open the wallet's send UI instead, with any supplied fields pre-filled for the user to confirm or edit before signing. In this mode all fields are optional.

```ts
import { Actions } from 'wagmi/tempo'
import { config } from './config'

await Actions.wallet.transfer(config, {
  editable: true,
  token: 'pathUSD',
})
```

## Return Type

```ts
type ReturnType = {
  /** Chain ID the transfer was submitted to. */
  chainId: number
  /** Receipt of the submitted transfer. */
  receipt: TransactionReceipt
}
```

## Parameters

### editable (optional)

- **Type:** `boolean`
- **Default:** `false`

When omitted or `false`, the call submits without showing an editable UI. When `true`, the wallet UI is shown with the supplied fields pre-filled.

### amount

- **Type:** `string`
- **Required when** `editable` is omitted or `false`.

Human-readable amount to transfer (for example, `"1.5"`).

### to

- **Type:** `Address`
- **Required when** `editable` is omitted or `false`.

Recipient address.

### token

- **Type:** `Address | string`
- **Required when** `editable` is omitted or `false`.

Token to transfer, accepted as either a contract address or a curated tokenlist symbol (case-insensitive, for example `"pathUsd"`). Symbols are resolved against the curated tokenlist on the active chain. Omit (in editable mode) to let the user choose.

### from (optional)

- **Type:** `Address`
- **Read-only mode only.**

Address to transfer tokens from. Defaults to the active account. When set to a different address, the call uses `transferFrom` and requires the active account to have an allowance from `from`.

### memo (optional)

- **Type:** `string`

UTF-8 memo to attach to the transfer (max 32 bytes when encoded as UTF-8). Sent via `transferWithMemo` / `transferFromWithMemo`. The wallet rejects the request if the selected token does not support memos (non-TIP-20).

### chainId (optional)

- **Type:** `config['chains'][number]['id']`

Chain ID to use. Defaults to the current chain.

### feePayer (optional)

- **Type:** `boolean | string`

Fee payer override. Pass `false` to disable the wallet's default fee payer, or a URL string to use a custom fee payer service.

### account (optional)

- **Type:** `Account | Address | null`

Account to use for the connector client. Use `null` to let the wallet infer the account. Defaults to the connected Wagmi account.

### connector (optional)

- **Type:** `Connector`

Connector to use. Defaults to the active connector.

## Viem

- [`wallet.transfer`](https://viem.sh/tempo/actions/wallet.transfer)
