# `dex.useBuyQuote`

Gets the quote for buying a specific amount of tokens.

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

const { data: quote } = Hooks.dex.useBuyQuote({
  amountOut: parseUnits('100', 6),
  tokenIn: '0x20c0000000000000000000000000000000000001',
  tokenOut: '0x20c0000000000000000000000000000000000002',
})

console.log('Amount needed:', quote)
// @log: Amount needed: 100300000n
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `dex.getBuyQuote` Return Type](/tempo/actions/dex.getBuyQuote#return-type)

## Parameters

See [Wagmi Action `dex.getBuyQuote` Parameters](/tempo/actions/dex.getBuyQuote#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`dex.getBuyQuote`](/tempo/actions/dex.getBuyQuote)
