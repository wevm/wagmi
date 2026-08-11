# `token.useWatchApprove`

Watches for token approval events on TIP20 tokens.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.token.useWatchApprove({
  onApproval: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchApprove` Parameters](/tempo/actions/token.watchApprove#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.approve`](/tempo/actions/token.approve)
- [`token.watchApprove`](/tempo/actions/token.watchApprove)
