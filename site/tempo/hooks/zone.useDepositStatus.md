# `zone.useDepositStatus`

Hook for getting deposit processing status for a Tempo block number.

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

const { data } = Hooks.zone.useDepositStatus({
  chainId: zoneChain.id,
  tempoBlockNumber: 42n,
  query: {
    initialData: {
      deposits: [
        {
          amount: 123_000_000n,
          depositHash:
            '0x1111111111111111111111111111111111111111111111111111111111111111',
          kind: 'regular',
          memo:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          recipient: '0x20c0000000000000000000000000000000000002',
          sender: '0x20c0000000000000000000000000000000000000',
          status: 'processed',
          token: '0x20c0000000000000000000000000000000000001',
        },
      ],
      processed: true,
      tempoBlockNumber: 42n,
      zoneProcessedThrough: 42n,
    },
  },
})

console.log('Processed:', data?.processed)
// @log: Processed: true
```
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `zone.getDepositStatus` Return Type](/tempo/actions/zone.getDepositStatus#return-type)

## Parameters

See [Wagmi Action `zone.getDepositStatus` Parameters](/tempo/actions/zone.getDepositStatus#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`zone.getDepositStatus`](/tempo/actions/zone.getDepositStatus)
