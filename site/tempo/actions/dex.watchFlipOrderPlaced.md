# `dex.watchFlipOrderPlaced`

Watches for flip order placed events on the Stablecoin DEX.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"546bd06c6d922c9812fee931dd4652721a211f4c197b95a0862ff50f70b8b057","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.dex.watchFlipOrderPlaced(config, {
  onFlipOrderPlaced(args, log) {
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

### onFlipOrderPlaced

- **Type:** `function`

```ts
declare function onFlipOrderPlaced(args: Args, log: Log): void

type Args = {
  /** ID of the placed order */
  orderId: bigint
  /** Address that placed the order */
  maker: Address
  /** Address of the base token */
  token: Address
  /** Amount of tokens in the order */
  amount: bigint
  /** Whether this is a buy order */
  isBid: boolean
  /** Price tick for the order */
  tick: number
  /** Target tick to flip to when filled */
  flipTick: number
}
```

Callback to invoke when a flip order is placed.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by order ID */
  orderId?: bigint | bigint[] | null
  /** Filter by maker address */
  maker?: Address | Address[] | null
  /** Filter by token address */
  token?: Address | Address[] | null
}
```

Filter parameters for the event subscription.

### maker (optional)

- **Type:** `Address`

Address of the maker to filter events.

### token (optional)

- **Type:** `Address`

Address of the token to filter events.

### fromBlock (optional)

- **Type:** `bigint`

Block to start listening from.

### onError (optional)

- **Type:** `(error: Error) => void`

The callback to call when an error occurred when trying to get for a new block.

### poll (optional)

- **Type:** `true`

Whether to use polling.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`dex.watchFlipOrderPlaced`](https://viem.sh/tempo/actions/dex.watchFlipOrderPlaced)

