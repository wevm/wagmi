# `dex.useWatchFlipOrderPlaced`

Watches for flip order placed events on the Stablecoin DEX.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.dex.useWatchFlipOrderPlaced({
  onFlipOrderPlaced: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `dex.watchFlipOrderPlaced` Parameters](/tempo/actions/dex.watchFlipOrderPlaced#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`dex.placeFlip`](/tempo/actions/dex.placeFlip)
- [`dex.watchFlipOrderPlaced`](/tempo/actions/dex.watchFlipOrderPlaced)
