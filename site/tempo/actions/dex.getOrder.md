# `dex.getOrder`

Gets an order's details from the Stablecoin DEX orderbook.  

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
import { config } from './config'

const order = await Actions.dex.getOrder(config, {
  orderId: 123n,
})

console.log('Order details:', order)
// @log: Order details: { amount: 100000000n, maker: '0x...', isBid: true, ... }
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

## Return Type

```ts
type ReturnType = {
  /** Original order amount */
  amount: bigint
  /** Orderbook key (identifies the trading pair) */
  bookKey: Hex
  /** Tick to flip to when fully filled (for flip orders). For bid flips: must be > tick. For ask flips: must be < tick */
  flipTick: number
  /** Whether this is a bid (true) or ask (false) order */
  isBid: boolean
  /** Whether this is a flip order */
  isFlip: boolean
  /** Address of the user who placed this order */
  maker: Address
  /** Next order ID in the doubly linked list (0 if tail) */
  next: bigint
  /** The order ID */
  orderId: bigint
  /** Previous order ID in the doubly linked list (0 if head) */
  prev: bigint
  /** Remaining amount to be filled */
  remaining: bigint
  /** Price tick */
  tick: number
}
```

Returns the complete order details including the maker's address, order amounts, price tick, linked list pointers, and flip order information.

## Parameters

### orderId

- **Type:** `bigint`

Order ID to query.

## Viem

- [`dex.getOrder`](https://viem.sh/tempo/actions/dex.getOrder)
