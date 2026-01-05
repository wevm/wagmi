# `dex.useSellQuote`

Gets the quote for selling a specific amount of tokens.

## Usage

::: code-group
```ts twoslash [example.ts]
// @errors: 2322
import type { Config } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
declare module 'wagmi' {
  interface Register {
    config: Config<readonly [typeof tempoTestnet]>
  }
}
// ---cut---
import { Hooks } from 'wagmi/tempo'
import { parseUnits } from 'viem'

const { data: quote } = Hooks.dex.useSellQuote({
  amountIn: parseUnits('100', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Amount received:', quote)
// @log: Amount received: 99700000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `dex.getSellQuote` Return Type](/tempo/actions/dex.getSellQuote#return-type)

## Parameters

See [Wagmi Action `dex.getSellQuote` Parameters](/tempo/actions/dex.getSellQuote#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`dex.getSellQuote`](/tempo/actions/dex.getSellQuote)
