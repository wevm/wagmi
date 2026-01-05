# `dex.useTickLevel`

Gets the tick level information at a specific tick on the Stablecoin DEX orderbook.

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
import { Tick } from 'viem/tempo'

const { data: level } = Hooks.dex.useTickLevel({
  base: '0x20c0000000000000000000000000000000000001',
  tick: Tick.fromPrice('1.001'),
  isBid: true,
})

console.log('Tick level:', level)
// @log: Tick level: { head: 1n, tail: 5n, totalLiquidity: 1000000000n }
```
<<< @/snippets/react/config-tempo.ts{ts twoslash} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `dex.getTickLevel` Return Type](/tempo/actions/dex.getTickLevel#return-type)

## Parameters

See [Wagmi Action `dex.getTickLevel` Parameters](/tempo/actions/dex.getTickLevel#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`dex.getTickLevel`](/tempo/actions/dex.getTickLevel)
