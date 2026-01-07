# `dex.watchOrderFilled`

Watches for order filled events on the Stablecoin DEX.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"31f40edcd3e0cb0dd5299ece3d0406a3ef9a70aba1beaad5bca49c399a7dd538","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.dex.watchOrderFilled(config, {
  onOrderFilled(args, log) {
    console.log('args:', args)
  },
})

// Later, stop watching
unwatch()
```

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

:::

## Return Type

```ts
type ReturnType = () => void
```

Returns a function to unsubscribe from the event.

## Parameters

### onOrderFilled

- **Type:** `function`

```ts
declare function onOrderFilled(args: Args, log: Log): void

type Args = {
  /** ID of the filled order */
  orderId: bigint
  /** Address that placed the order */
  maker: Address
  /** Amount of tokens filled */
  amountFilled: bigint
  /** Whether the order was partially filled */
  partialFill: boolean
}
```

Callback to invoke when an order is filled.

### maker (optional)

- **Type:** `Address`

Address of the maker to filter events.

### orderId (optional)

- **Type:** `bigint`

Order ID to filter events.

### taker (optional)

- **Type:** `Address`

Address of the taker to filter events.

### fromBlock (optional)

- **Type:** `bigint`

Block to start listening from.

### onError (optional)

- **Type:** `function`

```ts
declare function onError(error: Error): void
```

The callback to call when an error occurred when trying to get for a new block.

### poll (optional)

- **Type:** `true`

Whether to use polling.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`dex.watchOrderFilled`](https://viem.sh/tempo/actions/dex.watchOrderFilled)

