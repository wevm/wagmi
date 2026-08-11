# `policy.useWatchBlacklistUpdated`

Watches for blacklist update events on the TIP403 Registry.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.policy.useWatchBlacklistUpdated({
  onBlacklistUpdated: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `policy.watchBlacklistUpdated` Parameters](/tempo/actions/policy.watchBlacklistUpdated#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`policy.modifyBlacklist`](/tempo/actions/policy.modifyBlacklist)
- [`policy.watchBlacklistUpdated`](/tempo/actions/policy.watchBlacklistUpdated)
