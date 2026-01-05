# `dex.getTickLevel`

Gets the tick level information at a specific tick on the Stablecoin DEX orderbook.  

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
import { Tick } from 'viem/tempo'
import { config } from './config'

const level = await Actions.dex.getTickLevel(config, {
  base: '0x20c0000000000000000000000000000000000001',
  tick: Tick.fromPrice('1.001'),
  isBid: true,
})

console.log('Tick level:', level)
// @log: Tick level: { head: 1n, tail: 5n, totalLiquidity: 1000000000n }
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Order ID of the first order at this tick (0 if empty) */
  head: bigint
  /** Order ID of the last order at this tick (0 if empty) */
  tail: bigint
  /** Total liquidity available at this tick level */
  totalLiquidity: bigint
}
```

Returns the price level information including the order IDs for the head and tail of the FIFO queue at this price level, and the total liquidity available.

## Parameters

### base

- **Type:** `Address`

Address of the base token.

### isBid

- **Type:** `boolean`

Whether to query the bid side (`true`) or ask side (`false`).

### tick

- **Type:** `number`

Price tick to query. Can be created using `Tick.fromPrice()`.

## Viem

- [`dex.getTickLevel`](https://viem.sh/tempo/actions/dex.getTickLevel)
