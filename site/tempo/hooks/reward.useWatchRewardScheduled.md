# `reward.useWatchRewardScheduled`

Watches for reward scheduled events when new reward streams are started.

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

Hooks.reward.useWatchRewardScheduled({
  onRewardScheduled: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Parameters

See [Wagmi Action `reward.watchRewardScheduled` Parameters](/tempo/actions/reward.watchRewardScheduled#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`reward.start`](/tempo/actions/reward.start)
- [`reward.watchRewardScheduled`](/tempo/actions/reward.watchRewardScheduled)
