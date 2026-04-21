# `token.useWatchCreate`

Watches for new TIP20 token creation events on the TIP20 Factory.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.token.useWatchCreate({
  onTokenCreated: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchCreate` Parameters](/tempo/actions/token.watchCreate#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.create`](/tempo/actions/token.create)
- [`token.watchCreate`](/tempo/actions/token.watchCreate)
