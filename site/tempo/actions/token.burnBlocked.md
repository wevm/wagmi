# `token.burnBlocked`

Burns TIP-20 tokens from a blocked address. Requires the `BURN_BLOCKED` role. [Learn more about token roles](https://docs.tempo.xyz/protocol/tip403/spec)

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

const { receipt } = await Actions.token.burnBlockedSync(config, {
  amount: parseUnits('10.5', 6),
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.burnBlocked` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.burnBlocked(config, {
  amount: parseUnits('10.5', 6),
  from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.burnBlocked.extractEvent(receipt.logs)
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

### from

- **Type:** `Address`

Address to burn tokens from.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.burnBlocked`](https://viem.sh/tempo/actions/token.burnBlocked)
