# `zone.getAuthorizationTokenInfo`

Gets information about the currently stored Tempo zone authorization token.

This action expects the zone transport to already have an authorization token in storage. Use [`zone.signAuthorizationToken`](/tempo/actions/zone.signAuthorizationToken) first.

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

await Actions.zone.signAuthorizationToken(config, {
  chainId: zoneChain.id,
})

const result = await Actions.zone.getAuthorizationTokenInfo(config, {
  chainId: zoneChain.id,
})

console.log('Expires At:', result.expiresAt)
// @log: Expires At: 1700000000n
```

:::

## Return Type

```ts
type ReturnType = {
  account: Address
  expiresAt: bigint
}
```

Information about the stored authorization token.

## Parameters

### chainId (optional)

- **Type:** `number`

Zone chain ID to query. Useful when your Wagmi config supports more than one chain.

## Viem

- [`zone.getAuthorizationTokenInfo`](https://viem.sh/tempo/actions/zone.getAuthorizationTokenInfo)
