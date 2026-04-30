# `reward.useWatchRewardRecipientSet`

Watches for reward recipient set events when token holders change their reward recipient.

## Usage

::: code-group
```ts [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.reward.useWatchRewardRecipientSet({
  onRewardRecipientSet: (args, log) => {
    console.log('args:', args)
  },
  token: '0x20c0000000000000000000000000000000000000',
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `reward.watchRewardRecipientSet` Parameters](/tempo/actions/reward.watchRewardRecipientSet#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`reward.setRecipient`](/tempo/actions/reward.setRecipient)
- [`reward.watchRewardRecipientSet`](/tempo/actions/reward.watchRewardRecipientSet)
