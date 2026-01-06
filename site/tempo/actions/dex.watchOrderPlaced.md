# `dex.watchOrderPlaced`

Watches for order placed events on the Stablecoin DEX.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"2279834665a0cfd3fb844984d371abd87f4fb79413544bf125a15d46b41d1004","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.dex.watchOrderPlaced(config, {
  onOrderPlaced(args, log) {
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

### onOrderPlaced

- **Type:** `function`

```ts
declare function onOrderPlaced(args: Args, log: Log): void

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
}
```

Callback to invoke when an order is placed.

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

Filter parameters for the watch subscription.

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

Enable polling mode.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`dex.watchOrderPlaced`](https://viem.sh/tempo/actions/dex.watchOrderPlaced)
