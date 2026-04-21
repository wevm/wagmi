# `zone.useZoneInfo`

Hook for getting Tempo zone metadata.

This hook expects a zone authorization token to already exist in storage. Use [`zone.useSignAuthorizationToken`](/tempo/hooks/zone.useSignAuthorizationToken) first.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const { data: zoneInfo } = Hooks.zone.useZoneInfo({
  chainId: zoneChain.id,
  query: {
    initialData: {
      chainId: zoneChain.id,
      sequencer: '0x0000000000000000000000000000000000000007',
      zoneId: 7,
      zoneTokens: ['0x20c0000000000000000000000000000000000001'],
    },
  },
})

console.log('Zone ID:', zoneInfo?.zoneId)
// @log: Zone ID: 7
```

```ts [wagmi.config.ts] filename="wagmi.config.ts"
// @noErrors
import { createConfig } from 'wagmi'
import { KeyManager, webAuthn } from 'wagmi/tempo'
import { http as zoneHttp, zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

export const config = createConfig({
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
```
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `zone.getZoneInfo` Return Type](/tempo/actions/zone.getZoneInfo#return-type)

## Parameters

See [Wagmi Action `zone.getZoneInfo` Parameters](/tempo/actions/zone.getZoneInfo#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`zone.getZoneInfo`](/tempo/actions/zone.getZoneInfo)
