# `dex.useWatchFlipOrderPlaced`

Watches for flip order placed events on the Stablecoin DEX.

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

Hooks.dex.useWatchFlipOrderPlaced({
  onFlipOrderPlaced: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `dex.watchFlipOrderPlaced` Parameters](/tempo/actions/dex.watchFlipOrderPlaced#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`dex.placeFlip`](/tempo/actions/dex.placeFlip)
- [`dex.watchFlipOrderPlaced`](/tempo/actions/dex.watchFlipOrderPlaced)
