# `policy.useWatchWhitelistUpdated`

Watches for whitelist update events on the TIP403 Registry.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.policy.useWatchWhitelistUpdated({
  onWhitelistUpdated: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `policy.watchWhitelistUpdated` Parameters](/tempo/actions/policy.watchWhitelistUpdated#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`policy.modifyWhitelist`](/tempo/actions/policy.modifyWhitelist)
- [`policy.watchWhitelistUpdated`](/tempo/actions/policy.watchWhitelistUpdated)
