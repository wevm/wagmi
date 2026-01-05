# `token.transfer`

Transfers TIP-20 tokens from the caller to a recipient.

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
import { parseUnits } from 'viem'
import { config } from './config'

const { receipt } = await Actions.token.transferSync(config, {
  amount: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})

console.log('Transaction hash:', receipt.transactionHash)
// @log: Transaction hash: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `token.transfer` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.token.transfer(config, {
  amount: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  token: '0x20c0000000000000000000000000000000000000',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args } 
  = viem_Actions.token.transfer.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Amount of tokens transferred */
  amount: bigint
  /** Address tokens were transferred from */
  from: Address
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address tokens were transferred to */
  to: Address
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to transfer.

### to

- **Type:** `Address`

Address to transfer tokens to.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP-20 token.

### memo (optional)

- **Type:** `Hex`

Optional memo to attach to the transfer event.

### from (optional)

- **Type:** `Address`

Address to transfer tokens from. When specified, transfers tokens from the given address (requires prior approval). Defaults to the caller's address.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`token.transfer`](https://viem.sh/tempo/actions/token.transfer)
