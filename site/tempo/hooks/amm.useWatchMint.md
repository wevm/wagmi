# `amm.useWatchMint`

Watches for liquidity mint events on the Fee AMM.  

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.amm.useWatchMint({
  onMint: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `amm.watchMint` Parameters](/tempo/actions/amm.watchMint#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`amm.mint`](/tempo/actions/amm.mint)
- [`amm.watchMint`](/tempo/actions/amm.watchMint)

