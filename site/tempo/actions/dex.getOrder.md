# `dex.getOrder`

Gets an order's details from the Stablecoin DEX orderbook.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"1b4c194e1433ff47798203a8d893230e07a7bba99b163b51514c7b0d01dbdc5f","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
