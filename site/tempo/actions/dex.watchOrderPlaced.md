# `dex.watchOrderPlaced`

Watches for order placed events on the Stablecoin DEX.  

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

const unwatch = Actions.dex.watchOrderPlaced(config, {
  onOrderPlaced(args, log) {
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
