# `token.useWatchCreate`

Watches for new TIP20 token creation events on the TIP20 Factory.

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

Hooks.token.useWatchCreate({
  onTokenCreated: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchCreate` Parameters](/tempo/actions/token.watchCreate#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.create`](/tempo/actions/token.create)
- [`token.watchCreate`](/tempo/actions/token.watchCreate)
