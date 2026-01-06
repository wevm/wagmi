# `amm.rebalanceSwap`

Performs a rebalance swap between user and validator tokens. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"e399d67fb11f22f03c5401507bb51f3428c3c4c6a5e925ed4f4bc4e8e55c065a","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { config } from './config'

const { amountIn, receipt } = await Actions.amm.rebalanceSwapSync(config, {
  amountOut: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('Amount in:', amountIn)
// @log: 10605000n
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `amm.rebalanceSwap` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { Actions as viem_Actions } from 'viem/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'

const hash = await Actions.amm.rebalanceSwap(config, {
  amountOut: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { amountIn } } 
  = viem_Actions.amm.rebalanceSwap.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** Amount of tokens required for the swap */
  amountIn: bigint
  /** Amount of output tokens received */
  amountOut: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
  /** Address that initiated the swap */
  swapper: Address
  /** Address of the user token */
  userToken: Address
  /** Address of the validator token */
  validatorToken: Address
}
```

## Parameters

### amountOut

- **Type:** `bigint`

Amount of user token to receive.

### to

- **Type:** `Address`

Address to send the user token to.

### userToken

- **Type:** `Address | bigint`

Address or ID of the user token.

### validatorToken

- **Type:** `Address | bigint`

Address or ID of the validator token.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`amm.rebalanceSwap`](https://viem.sh/tempo/actions/amm.rebalanceSwap)
