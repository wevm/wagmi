# `amm.watchFeeSwap`

Watches for fee swap events on the Fee AMM.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"f40630642e76f5427f027fcb9d398025479fb878eaa4819bcac76792856c1941","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.amm.watchFeeSwap(config, {
  onFeeSwap(args, log) {
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

### onFeeSwap

- **Type:** `function`

```ts
declare function onFeeSwap(args: Args, log: Log): void

type Args = {
  /** Address of the user token */
  userToken: Address
  /** Address of the validator token */
  validatorToken: Address
  /** Amount of user token swapped in */
  amountIn: bigint
  /** Amount of validator token received */
  amountOut: bigint
}
```

Callback to invoke when a fee swap occurs.

### userToken (optional)

- **Type:** `Address | bigint`

Address or ID of the user token to filter events.

### validatorToken (optional)

- **Type:** `Address | bigint`

Address or ID of the validator token to filter events.

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

- [`amm.watchFeeSwap`](https://viem.sh/tempo/actions/amm.watchFeeSwap)

