# `dex.placeFlip`

Places a flip order that automatically flips to the opposite side when filled.  

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
import { Tick } from 'viem/tempo'
import { config } from './config'

const { orderId, receipt } = await Actions.dex.placeFlipSync(config, {
  amount: parseUnits('100', 6),
  flipTick: Tick.fromPrice('1.01'),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})

console.log('Flip order ID:', orderId)
// @log: Flip order ID: 456n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.placeFlip` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { Actions as viem_Actions } from 'viem/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { parseUnits } from 'viem'
import { Tick } from 'viem/tempo'

const hash = await Actions.dex.placeFlip(config, {
  amount: parseUnits('100', 6),
  flipTick: Tick.fromPrice('1.01'),
  tick: Tick.fromPrice('0.99'),
  token: '0x20c0000000000000000000000000000000000001',
  type: 'buy',
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { orderId } } 
  = viem_Actions.dex.placeFlip.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** ID of the placed flip order */
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
  /** Target tick to flip to when order is filled */
  flipTick: number
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### amount

- **Type:** `bigint`

Amount of tokens to place in the order.

### flipTick

- **Type:** `number`

Target tick to flip to when order is filled. Must be greater than `tick` for buy orders, less than `tick` for sell orders.

### tick

- **Type:** `number`

Price tick for the order. Use `Tick.fromPrice()` to convert from a price string.

### token

- **Type:** `Address`

Address of the base token.

### type

- **Type:** `'buy' | 'sell'`

Order type - `'buy'` to buy the token, `'sell'` to sell it.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.placeFlip`](https://viem.sh/tempo/actions/dex.placeFlip)
