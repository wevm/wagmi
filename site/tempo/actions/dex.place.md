# `dex.place`

Places a limit order on the Stablecoin DEX orderbook.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"ae78873af261e30e0a9ea1adc6baa89b8d91d755de180f0299788136db141068","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'
import { config } from './config'

const { orderId, receipt } = await Actions.dex.placeSync(config, {
  amount: parseUnits('100', 6),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})

console.log('Order ID:', orderId)
// @log: Order ID: 123n
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.place` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { Actions as viem_Actions } from 'viem/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'

const hash = await Actions.dex.place(config, {
  amount: parseUnits('100', 6),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { orderId } } 
  = viem_Actions.dex.place.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** ID of the placed order */
  orderId: bigint
  /** Address of the order maker */
  maker: Address
  /** Address of the base token */
  token: Address
  /** Amount of tokens in the order */
  amount: bigint
  /** Whether this is a buy order */
  isBid: boolean
  /** Price tick for the order */
  tick: number
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to place in the order.

### tick

- **Type:** `number`

Price tick for the order. Use `Tick.fromPrice()` to convert from a price string.

### token

- **Type:** `Address`

Address of the base token.

### type

- **Type:** `OrderType`

Order type - `'buy'` to buy the token, `'sell'` to sell it.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.place`](https://viem.sh/tempo/actions/dex.place)
