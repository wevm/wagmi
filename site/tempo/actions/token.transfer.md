# `token.transfer`

Transfers TIP-20 tokens from the caller to a recipient.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"dec220aff49bf6fbcd09bc1c824e3f8dc091edf7bd95fbbb92e4c24833c8f7ec","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
