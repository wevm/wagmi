# `dex.place`

Places a limit order on the Stablecoin DEX orderbook.  

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

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
