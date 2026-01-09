# `reward.distribute`

Distributes tokens to opted-in holders.

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { parseEther } from 'viem'
import { config } from './config'

const { amount, funder, receipt } =
  await Actions.reward.distributeSync(config, {
    amount: parseEther('1000'),
    token: '0x20c0000000000000000000000000000000000000',
  })

console.log('Amount:', amount)
// @log: Amount: 1000000000000000000000n
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.distribute` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseEther } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.reward.distribute(config, {
  amount: parseEther('1000'),
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { funder, amount } }
  = viem_Actions.reward.distribute.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Total amount distributed */
  amount: bigint
  /** Address that funded the distribution */
  funder: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### amount

- **Type:** `bigint`

The amount of tokens to distribute. Must be greater than 0.

### token

- **Type:** `Address`

Address of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`reward.distribute`](https://viem.sh/tempo/actions/reward.distribute)
