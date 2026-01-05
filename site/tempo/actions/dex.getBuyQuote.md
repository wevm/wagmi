# `dex.getBuyQuote`

Gets the quote for buying a specific amount of tokens.  

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

const amountIn = await Actions.dex.getBuyQuote(config, {
  amountOut: parseUnits('100', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Amount needed:', amountIn)
// @log: Amount needed: 100300000n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = bigint
```

Returns the amount of `tokenIn` needed to buy the specified `amountOut` of `tokenOut`.

## Parameters

### amountOut

- **Type:** `bigint`

Amount of tokenOut to buy.

### tokenIn

- **Type:** `Address`

Address of the token to spend.

### tokenOut

- **Type:** `Address`

Address of the token to buy.

## Viem

- [`dex.getBuyQuote`](https://viem.sh/tempo/actions/dex.getBuyQuote)
