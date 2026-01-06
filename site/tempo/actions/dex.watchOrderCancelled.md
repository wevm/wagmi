# `dex.watchOrderCancelled`

Watches for order cancelled events on the Stablecoin DEX.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"1aec0eda0f46341180a0b333aee616ad8d50c79358e60da62345f78224a573d1","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.dex.watchOrderCancelled(config, {
  onOrderCancelled(args, log) {
    console.log('Order cancelled:', args.orderId)
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

### onOrderCancelled

- **Type:** `function`

```ts
declare function onOrderCancelled(args: Args, log: Log): void

type Args = {
  /** ID of the cancelled order */
  orderId: bigint
}
```

Callback to invoke when an order is cancelled.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Order ID to filter events */
  orderId?: bigint | bigint[] | null
}
```

Filter options for the event.

### orderId (optional)

- **Type:** `bigint`

Order ID to filter events.

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

Enable polling mode.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`dex.watchOrderCancelled`](https://viem.sh/tempo/actions/dex.watchOrderCancelled)
