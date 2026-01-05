# `dex.buy`

Buys a specific amount of tokens from the Stablecoin DEX orderbook.  

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

const { receipt } = await Actions.dex.buySync(config, {
  amountOut: parseUnits('100', 6),
  maxAmountIn: parseUnits('105', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Transaction hash:', receipt.transactionHash)
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.buy` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'

const hash = await Actions.dex.buy(config, {
  amountOut: parseUnits('100', 6),
  maxAmountIn: parseUnits('105', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
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

### amountOut

- **Type:** `bigint`

Amount of tokenOut to buy.

### maxAmountIn

- **Type:** `bigint`

Maximum amount of tokenIn to spend.

### tokenIn

- **Type:** `Address`

Address of the token to spend.

### tokenOut

- **Type:** `Address`

Address of the token to buy.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.buy`](https://viem.sh/tempo/actions/dex.buy)
