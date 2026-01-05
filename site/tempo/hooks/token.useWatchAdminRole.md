# `token.useWatchAdminRole`

Watches for role admin update events on TIP20 tokens.

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

Hooks.token.useWatchAdminRole({
  onRoleAdminUpdated: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `token.watchAdminRole` Parameters](/tempo/actions/token.watchAdminRole#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`token.setRoleAdmin`](/tempo/actions/token.setRoleAdmin)
- [`token.watchAdminRole`](/tempo/actions/token.watchAdminRole)
