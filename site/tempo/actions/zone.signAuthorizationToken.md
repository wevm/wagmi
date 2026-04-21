# `zone.signAuthorizationToken`

Signs and stores a zone authorization token for the configured account and zone chain.

The token is persisted to the provided storage so future zone RPC requests made through `viem/tempo/zones` transports can send the `X-Authorization-Token` header automatically.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group

```ts [example.ts]
import { createConfig } from 'wagmi'
import { KeyManager, webAuthn } from 'wagmi/tempo'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const config = createConfig({
  connectors: [
    webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  ],
  chains: [zoneChain],
  multiInjectedProviderDiscovery: false,
  transports: {
    [zoneChain.id]: zoneHttp(),
  },
})

import { Actions } from 'wagmi/tempo'

const result = await Actions.zone.signAuthorizationToken(config, {
  chainId: zoneChain.id,
})

console.log('Token:', result.token)
// @log: Token: 0x1234
```

:::

## Return Type

```ts
type ReturnType = {
  authentication: ZoneRpcAuthentication
  token: Hex
}
```

Returns the signed authentication payload and serialized token written to storage.

## Parameters

### account (optional)

- **Type:** `Address | Account`

Account override to use for signing instead of the connector's active account.

### chainId (optional)

- **Type:** `number`

Zone chain ID the token should be issued for.

### connector (optional)

- **Type:** `Connector`

Connector override to use instead of the current connection.

### expiresAt (optional)

- **Type:** `number`

Unix timestamp, in seconds, when the token should expire.

### issuedAt (optional)

- **Type:** `number`

Unix timestamp, in seconds, when the token should be considered issued.

### storage (optional)

- **Type:** `Storage`

Storage implementation used to persist the serialized token.

## Viem

- [`zone.signAuthorizationToken`](https://viem.sh/tempo/actions/zone.signAuthorizationToken)
