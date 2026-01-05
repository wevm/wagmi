# `amm.watchFeeSwap`

Watches for fee swap events on the Fee AMM.  

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

const unwatch = Actions.amm.watchFeeSwap(config, {
  onFeeSwap(args, log) {
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

