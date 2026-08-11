# `amm.useWatchRebalanceSwap`

Watches for rebalance swap events on the Fee AMM.  

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.amm.useWatchRebalanceSwap({
  onRebalanceSwap: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `amm.watchRebalanceSwap` Parameters](/tempo/actions/amm.watchRebalanceSwap#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`amm.rebalanceSwap`](/tempo/actions/amm.rebalanceSwap)
- [`amm.watchRebalanceSwap`](/tempo/actions/amm.watchRebalanceSwap)

