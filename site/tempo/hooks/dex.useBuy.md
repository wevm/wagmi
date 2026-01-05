# `dex.useBuy`

Buys a specific amount of tokens from the Stablecoin DEX orderbook.

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

const buySync = Hooks.dex.useBuySync()

// Call `mutate` in response to user action (e.g. button click, form submission)
buySync.mutate({
  amountOut: parseUnits('100', 6),
  maxAmountIn: parseUnits('105', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Transaction hash:', buySync.data?.receipt.transactionHash)
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.buy` action and wait for inclusion manually:

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
import { parseUnits } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'

const buy = Hooks.dex.useBuy()
const { data: receipt } = useWaitForTransactionReceipt({ hash: buy.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
buy.mutate({
  amountOut: parseUnits('100', 6),
  maxAmountIn: parseUnits('105', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `dex.buy` Return Type](/tempo/actions/dex.buy#return-type)

### mutate/mutateAsync

See [Wagmi Action `dex.buy` Parameters](/tempo/actions/dex.buy#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`dex.buy`](/tempo/actions/dex.buy)
