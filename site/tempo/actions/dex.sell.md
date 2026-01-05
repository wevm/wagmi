# `dex.sell`

Sells a specific amount of tokens on the Stablecoin DEX orderbook.  

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

const { receipt } = await Actions.dex.sellSync(config, {
  amountIn: parseUnits('100', 6),
  minAmountOut: parseUnits('95', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Transaction hash:', receipt.transactionHash)
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.sell` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'

const hash = await Actions.dex.sell(config, {
  amountIn: parseUnits('100', 6),
  minAmountOut: parseUnits('95', 6),
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

### amountIn

- **Type:** `bigint`

Amount of tokenIn to sell.

### minAmountOut

- **Type:** `bigint`

Minimum amount of tokenOut to receive.

### tokenIn

- **Type:** `Address`

Address of the token to sell.

### tokenOut

- **Type:** `Address`

Address of the token to receive.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.sell`](https://viem.sh/tempo/actions/dex.sell)
