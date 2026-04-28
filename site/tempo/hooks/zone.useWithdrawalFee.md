# `zone.useWithdrawalFee`

Hook for getting the withdrawal fee for a given gas limit.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { zone } from 'viem/tempo/zones'

const zoneChain = zone(7)

const { data } = Hooks.zone.useWithdrawalFee({
  chainId: zoneChain.id,
  gas: 21_000n,
  query: {
    initialData: 22_000n,
  },
})

console.log('Fee:', data)
// @log: Fee: 22000n
```
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `zone.getWithdrawalFee` Return Type](/tempo/actions/zone.getWithdrawalFee#return-type)

## Parameters

See [Wagmi Action `zone.getWithdrawalFee` Parameters](/tempo/actions/zone.getWithdrawalFee#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`zone.getWithdrawalFee`](/tempo/actions/zone.getWithdrawalFee)
