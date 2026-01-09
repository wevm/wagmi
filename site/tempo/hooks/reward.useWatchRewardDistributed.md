# `reward.useWatchRewardDistributed`

Watches for reward distributed events.

## Usage

::: code-group
```ts twoslash [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.reward.useWatchRewardDistributed({
  onRewardDistributed: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `reward.watchRewardDistributed` Parameters](/tempo/actions/reward.watchRewardDistributed#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`reward.distribute`](/tempo/actions/reward.distribute)
- [`reward.watchRewardDistributed`](/tempo/actions/reward.watchRewardDistributed)
