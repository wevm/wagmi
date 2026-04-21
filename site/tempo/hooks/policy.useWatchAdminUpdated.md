# `policy.useWatchAdminUpdated`

Watches for policy admin update events on the TIP403 Registry.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.policy.useWatchAdminUpdated({
  onAdminUpdated: (args, log) => {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `policy.watchAdminUpdated` Parameters](/tempo/actions/policy.watchAdminUpdated#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`policy.setAdmin`](/tempo/actions/policy.setAdmin)
- [`policy.watchAdminUpdated`](/tempo/actions/policy.watchAdminUpdated)
