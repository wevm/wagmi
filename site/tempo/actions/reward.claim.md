# `reward.claim`

Claims accumulated rewards for the caller.

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

const { receipt } = await Actions.reward.claimSync(config, {
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `reward.claim` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.reward.claim(config, {
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })
```

## Return Type

```ts
type ReturnType = {
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### token

- **Type:** `Address`

Address of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`reward.claim`](https://viem.sh/tempo/actions/reward.claim)
