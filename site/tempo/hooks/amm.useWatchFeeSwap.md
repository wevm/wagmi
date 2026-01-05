# `amm.useWatchFeeSwap`

Watches for fee swap events on the Fee AMM.  

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

Hooks.amm.useWatchFeeSwap({
  onFeeSwap: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `amm.watchFeeSwap` Parameters](/tempo/actions/amm.watchFeeSwap#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`amm.feeSwap`](/tempo/actions/amm.feeSwap)
- [`amm.watchFeeSwap`](/tempo/actions/amm.watchFeeSwap)

