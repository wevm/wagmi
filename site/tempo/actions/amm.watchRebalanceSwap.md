# `amm.watchRebalanceSwap`

Watches for rebalance swap events on the Fee AMM.

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

const unwatch = Actions.amm.watchRebalanceSwap(config, {
  onRebalanceSwap(args, log) {
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

### onRebalanceSwap

- **Type:** `function`

```ts
declare function onRebalanceSwap(args: Args, log: Log): void

type Args = {
  /** Address of the user token */
  userToken: Address
  /** Address of the validator token */
  validatorToken: Address
  /** Address of the swapper */
  swapper: Address
  /** Amount of validator token swapped in */
  amountIn: bigint
  /** Amount of user token received */
  amountOut: bigint
}
```

Callback to invoke when a rebalance swap occurs.

### userToken (optional)

- **Type:** `Address | bigint`

Address or ID of the user token to filter events.

### validatorToken (optional)

- **Type:** `Address | bigint`

Address or ID of the validator token to filter events.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by user token address */
  userToken?: Address | Address[] | null
  /** Filter by validator token address */
  validatorToken?: Address | Address[] | null
  /** Filter by swapper address */
  swapper?: Address | Address[] | null
}
```

Filter parameters for the event.

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

- [`amm.watchRebalanceSwap`](https://viem.sh/tempo/actions/amm.watchRebalanceSwap)

