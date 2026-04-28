# `token.useWatchRole`

Watches for role membership update events on TIP20 tokens.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.token.useWatchRole({
  onRoleUpdated: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchRole` Parameters](/tempo/actions/token.watchRole#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.grantRoles`](/tempo/actions/token.grantRoles)
- [`token.watchRole`](/tempo/actions/token.watchRole)
