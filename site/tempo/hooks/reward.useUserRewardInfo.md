# `reward.useUserRewardInfo`

Gets reward information for a specific account.

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

const { data } = Hooks.reward.useUserRewardInfo({
  account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Reward recipient:', data?.rewardRecipient)
// @log: Reward recipient: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
console.log('Reward balance:', data?.rewardBalance)
// @log: Reward balance: 1000000000000000000n
console.log('Reward per token:', data?.rewardPerToken)
// @log: Reward per token: 385802469135802469135n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `reward.getUserRewardInfo` Return Type](/tempo/actions/reward.getUserRewardInfo#return-type)

## Parameters

See [Wagmi Action `reward.getUserRewardInfo` Parameters](/tempo/actions/reward.getUserRewardInfo#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`reward.getUserRewardInfo`](/tempo/actions/reward.getUserRewardInfo)
