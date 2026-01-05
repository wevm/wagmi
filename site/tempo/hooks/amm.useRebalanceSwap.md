# `amm.useRebalanceSwap`

Performs a rebalance swap between user and validator tokens. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

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
import { parseUnits } from 'viem'

const rebalanceSwapSync = Hooks.amm.useRebalanceSwapSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
rebalanceSwapSync.mutate({
  amountOut: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('Amount in:', rebalanceSwapSync.data?.amountIn)
// @log: 10605000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `amm.rebalanceSwap` action and wait for inclusion manually:

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
import { parseUnits } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'

const rebalanceSwap = Hooks.amm.useRebalanceSwap()
const { data: receipt } = useWaitForTransactionReceipt({ hash: rebalanceSwap.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
rebalanceSwap.mutate({
  amountOut: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

if (receipt) {
  const { args: { amountIn } } 
    = Actions.amm.rebalanceSwap.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `amm.rebalanceSwap` Return Type](/tempo/actions/amm.rebalanceSwap#return-type)

### mutate/mutateAsync

See [Wagmi Action `amm.rebalanceSwap` Parameters](/tempo/actions/amm.rebalanceSwap#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`amm.rebalanceSwap`](/tempo/actions/amm.rebalanceSwap)

