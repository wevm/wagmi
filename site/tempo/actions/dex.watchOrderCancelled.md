# `dex.watchOrderCancelled`

Watches for order cancelled events on the Stablecoin DEX.

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

const unwatch = Actions.dex.watchOrderCancelled(config, {
  onOrderCancelled(args, log) {
    console.log('Order cancelled:', args.orderId)
  },
})

// Later, stop watching
unwatch()
```

<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]

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
