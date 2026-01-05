# `token.burn`

Burns TIP-20 tokens from the caller's balance.

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
import { parseUnits } from 'viem'
import { config } from './config'

const { receipt } = await Actions.token.burnSync(config, {
  amount: parseUnits('10.5', 6),
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.burn` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.burn(config, {
  amount: parseUnits('10.5', 6),
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.burn.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Amount of tokens burned */
  amount: bigint
  /** Address tokens were burned from */
  from: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to burn.

### memo (optional)

- **Type:** `Hex`

Memo to include in the transfer.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.burn`](https://viem.sh/tempo/actions/token.burn)
