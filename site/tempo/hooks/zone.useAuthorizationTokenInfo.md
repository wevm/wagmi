# `zone.useAuthorizationTokenInfo`

Hook for getting information about the current Tempo zone authorization token.

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

const { data } = Hooks.zone.useAuthorizationTokenInfo({
  chainId: zoneChain.id,
  query: {
    initialData: {
      account: '0x20c0000000000000000000000000000000000000',
      expiresAt: 1_700_000_000n,
    },
  },
})

console.log('Expires At:', data?.expiresAt)
// @log: Expires At: 1700000000n
```
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `zone.getAuthorizationTokenInfo` Return Type](/tempo/actions/zone.getAuthorizationTokenInfo#return-type)

## Parameters

See [Wagmi Action `zone.getAuthorizationTokenInfo` Parameters](/tempo/actions/zone.getAuthorizationTokenInfo#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`zone.getAuthorizationTokenInfo`](/tempo/actions/zone.getAuthorizationTokenInfo)
