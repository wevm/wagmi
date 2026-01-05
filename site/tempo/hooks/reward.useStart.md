# `reward.useStart`

Starts a new reward stream that distributes tokens to opted-in holders.

## Usage

::: code-group
```ts twoslash [example.ts]
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof tempoTestnet]>
  }
}
// ---cut---
import { Hooks } from 'wagmi/tempo'
import { parseEther } from 'viem'

const startSync = Hooks.reward.useStartSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
startSync.mutate({
  amount: parseEther('1000'),
  seconds: 2_592_000, // 30 days
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Stream ID:', startSync.data?.id)
// @log: Stream ID: 1n
console.log('Amount:', startSync.data?.amount)
// @log: Amount: 1000000000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.distribute` action and wait for inclusion manually:

```ts twoslash
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof tempoTestnet]>
  }
}
// ---cut---
import { Hooks } from 'wagmi/tempo'
import { Actions } from 'viem/tempo'
import { parseEther } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'

const start = Hooks.reward.useStart()
const { data: receipt } = useWaitForTransactionReceipt({ hash: start.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
start.mutate({
  amount: parseEther('1000'),
  seconds: 2_592_000,
  token: '0x20c0000000000000000000000000000000000000',
})

if (receipt) {
  const { args: { id, funder, amount } }
    = Actions.reward.distribute.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `reward.start` Return Type](/tempo/actions/reward.start#return-type)

### mutate/mutateAsync

See [Wagmi Action `reward.start` Parameters](/tempo/actions/reward.start#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`reward.start`](/tempo/actions/reward.start)
