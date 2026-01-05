# `reward.start`

Starts a new reward stream that distributes tokens to opted-in holders.

## Usage

::: code-group

```ts twoslash [example.ts]
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
export const config = {} as Config<readonly [typeof tempoTestnet]>
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { parseEther } from 'viem'
import { config } from './config'

const { amount, funder, id, receipt } =
  await Actions.reward.startSync(config, {
    amount: parseEther('1000'),
    token: '0x20c0000000000000000000000000000000000000',
  })

console.log('Stream ID:', id)
// @log: Stream ID: 1n
console.log('Amount:', amount)
// @log: Amount: 1000000000000000000000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.start` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseEther } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.reward.start(config, {
  amount: parseEther('1000'),
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { id, funder, amount } }
  = viem_Actions.reward.start.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Total amount allocated to the stream */
  amount: bigint
  /** Address that funded the stream */
  funder: Address
  /** Unique stream ID */
  id: bigint
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

- [`reward.start`](https://viem.sh/tempo/actions/reward.start)
