# `token.useWatchTransfer`

Watches for token transfer events on TIP20 tokens.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.token.useWatchTransfer({
  onTransfer: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchTransfer` Parameters](/tempo/actions/token.watchTransfer#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.transfer`](/tempo/actions/token.transfer)
- [`token.watchTransfer`](/tempo/actions/token.watchTransfer)
