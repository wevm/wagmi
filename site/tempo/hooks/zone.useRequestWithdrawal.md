# `zone.useRequestWithdrawal`

Hook for requesting a withdrawal from a zone to the parent Tempo chain.

::: info Requires viem >=2.48.0
Zone actions and hooks require `viem >=2.48.0`.
:::

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'
import { zone } from 'viem/tempo/zones'

const zoneChain = zone(7)
const requestWithdrawalSync = Hooks.zone.useRequestWithdrawalSync()

requestWithdrawalSync.mutate({
  amount: 1_000_000n,
  chainId: zoneChain.id,
  token: '0x20c0000000000000000000000000000000000001',
})

console.log('Transaction hash:', requestWithdrawalSync.data?.receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `zone.requestWithdrawal` action and wait for inclusion manually:

```ts
import { Hooks } from 'wagmi/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'
import { zone } from 'viem/tempo/zones'

const zoneChain = zone(7)
const requestWithdrawal = Hooks.zone.useRequestWithdrawal()
const { data: receipt } = useWaitForTransactionReceipt({
  hash: requestWithdrawal.data,
})

requestWithdrawal.mutate({
  amount: 1_000_000n,
  chainId: zoneChain.id,
  token: '0x20c0000000000000000000000000000000000001',
})

console.log(receipt?.status)
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `zone.requestWithdrawal` Return Type](/tempo/actions/zone.requestWithdrawal#return-type)

### mutate/mutateAsync

See [Wagmi Action `zone.requestWithdrawal` Parameters](/tempo/actions/zone.requestWithdrawal#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`zone.requestWithdrawal`](/tempo/actions/zone.requestWithdrawal)
