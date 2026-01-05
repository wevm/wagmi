# `dex.watchOrderFilled`

Watches for order filled events on the Stablecoin DEX.

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
import { config } from './config'

const unwatch = Actions.dex.watchOrderFilled(config, {
  onOrderFilled(args, log) {
    console.log('args:', args)
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

