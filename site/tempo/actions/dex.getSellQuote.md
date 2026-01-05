# `dex.getSellQuote`

Gets the quote for selling a specific amount of tokens.  

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

const amountOut = await Actions.dex.getSellQuote(config, {
  amountIn: parseUnits('100', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Amount received:', amountOut)
// @log: Amount received: 99700000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint
```

Returns the amount of `tokenOut` received for selling the specified `amountIn` of `tokenIn`.

## Parameters

### amountIn

- **Type:** `bigint`

Amount of tokenIn to sell.

### tokenIn

- **Type:** `Address`

Address of the token to sell.

### tokenOut

- **Type:** `Address`

Address of the token to receive.

## Viem

- [`dex.getSellQuote`](https://viem.sh/tempo/actions/dex.getSellQuote)
