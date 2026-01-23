# `amm.watchMint`

Watches for liquidity mint events on the Fee AMM.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"3e678dc18ce9b1b0888b0e3f1b0a2e9e066a3d862bdcaf011c8c115c0b244c46","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.amm.watchMint(config, {
  onMint(args, log) {
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

### onMint

- **Type:**

```ts
declare function onMint(args: Args, log: Log): void

type Args = {
  /** Amount of LP tokens minted */
  liquidity: bigint
  /** Address that added liquidity */
  sender: Address
  /** User token details */
  userToken: {
    /** Address of the user token */
    address: Address
    /** Amount of user token added */
    amount: bigint
  }
  /** Validator token details */
  validatorToken: {
    /** Address of the validator token */
    address: Address
    /** Amount of validator token added */
    amount: bigint
  }
}
```

Callback to invoke when liquidity is added.

### sender (optional)

- **Type:** `Address | bigint`

Address or ID of the sender to filter events.

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

Enable polling mode for watching events.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`amm.watchMint`](https://viem.sh/tempo/actions/amm.watchMint)

