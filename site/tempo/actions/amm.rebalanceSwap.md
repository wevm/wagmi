# `amm.rebalanceSwap`

Performs a rebalance swap between user and validator tokens. [Learn more about the Fee AMM](https://docs.tempo.xyz/protocol/fees/spec-fee-amm)

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

const { amountIn, receipt } = await Actions.amm.rebalanceSwapSync(config, {
  amountOut: parseUnits('10.5', 6),
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbb',
  userToken: '0x20c0000000000000000000000000000000000000',
  validatorToken: '0x20c0000000000000000000000000000000000001',
})

console.log('Amount in:', amountIn)
// @log: 10605000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
