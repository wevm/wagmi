# `reward.getUserRewardInfo`

Gets reward information for a specific account.

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// ---cut---
// @filename: example.ts
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const { rewardBalance, rewardPerToken, rewardRecipient } =
  await Actions.reward.getUserRewardInfo(config, {
    account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
    token: '0x20c0000000000000000000000000000000000000',
  })

console.log('Reward recipient:', rewardRecipient)
// @log: Reward recipient: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb
console.log('Reward balance:', rewardBalance)
// @log: Reward balance: 1000000000000000000n
console.log('Reward per token:', rewardPerToken)
// @log: Reward per token: 385802469135802469135n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Accumulated reward balance claimable by the account */
  rewardBalance: bigint
  /** Reward per token checkpoint for the account */
  rewardPerToken: bigint
  /** Current reward recipient address (zero address if opted out) */
  rewardRecipient: Address
}
```

## Parameters

### account

- **Type:** `Address`

Address of the account to get reward info for.

### token

- **Type:** `Address`

Address of the TIP-20 token.

## Viem

- [`reward.getUserRewardInfo`](https://viem.sh/tempo/actions/reward.getUserRewardInfo)
