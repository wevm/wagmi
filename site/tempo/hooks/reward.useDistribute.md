# `reward.useDistribute`

Distributes tokens to opted-in holders.

## Usage

::: code-group
```ts twoslash [example.ts]
import { Hooks } from 'wagmi/tempo'
import { parseEther } from 'viem'

const distributeSync = Hooks.reward.useDistributeSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
distributeSync.mutate({
  amount: parseEther('1000'),
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Amount:', distributeSync.data?.amount)
// @log: Amount: 1000000000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.distribute` action and wait for inclusion manually:

```ts
import { Hooks } from 'wagmi/tempo'
import { Actions } from 'viem/tempo'
import { parseEther } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'

const distribute = Hooks.reward.useDistribute()
const { data: receipt } = useWaitForTransactionReceipt({ hash: distribute.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
distribute.mutate({
  amount: parseEther('1000'),
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const { args: { funder, amount } }
    = Actions.reward.distribute.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `reward.distribute` Return Type](/tempo/actions/reward.distribute#return-type)

### mutate/mutateAsync

See [Wagmi Action `reward.distribute` Parameters](/tempo/actions/reward.distribute#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`reward.distribute`](/tempo/actions/reward.distribute)
