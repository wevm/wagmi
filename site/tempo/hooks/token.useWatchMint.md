# `token.useWatchMint`

Watches for token mint events on TIP20 tokens.

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

Hooks.token.useWatchMint({
  onMint: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchMint` Parameters](/tempo/actions/token.watchMint#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.mint`](/tempo/actions/token.mint)
- [`token.watchMint`](/tempo/actions/token.watchMint)
