# `dex.cancel`

Cancels an order from the Stablecoin DEX orderbook.  

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

const { orderId, receipt } = await Actions.dex.cancelSync(config, {
  orderId: 123n,
})

console.log('Cancelled order ID:', orderId)
// @log: Cancelled order ID: 123n
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `dex.cancel` action and wait for inclusion manually:

```ts
import { Actions } from 'wagmi/tempo'
import { Actions as viem_Actions } from 'viem/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.dex.cancel(config, {
  orderId: 123n,
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { orderId } } 
  = viem_Actions.dex.cancel.extractEvent(receipt.logs)
```

## Return Type

```ts
type ReturnType = {
  /** ID of the cancelled order */
  orderId: bigint
  /** Transaction receipt */
  receipt: TransactionReceipt
}
```

## Parameters

### orderId

- **Type:** `bigint`

ID of the order to cancel.

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`dex.cancel`](https://viem.sh/tempo/actions/dex.cancel)
