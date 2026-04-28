# `amm.useWatchBurn`

Watches for liquidity burn events on the Fee AMM.  

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.amm.useWatchBurn({
  onBurn: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `amm.watchBurn` Parameters](/tempo/actions/amm.watchBurn#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`amm.burn`](/tempo/actions/amm.burn)
- [`amm.watchBurn`](/tempo/actions/amm.watchBurn)

