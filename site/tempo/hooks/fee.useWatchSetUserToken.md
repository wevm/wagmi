# `fee.useWatchSetUserToken`

Watches for user token set events on the Fee Manager.  

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.fee.useWatchSetUserToken({
  onUserTokenSet: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `fee.watchSetUserToken` Parameters](/tempo/actions/fee.watchSetUserToken#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`fee.setUserToken`](/tempo/actions/fee.setUserToken)
- [`fee.watchSetUserToken`](/tempo/actions/fee.watchSetUserToken)

