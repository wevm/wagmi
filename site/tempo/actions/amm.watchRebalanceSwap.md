# `amm.watchRebalanceSwap`

Watches for rebalance swap events on the Fee AMM.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"91e718ca006a23e8682b0ebc2f91d672ae05dd36421745b488980a673c12e660","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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

