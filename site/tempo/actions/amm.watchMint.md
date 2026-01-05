# `amm.watchMint`

Watches for liquidity mint events on the Fee AMM.  

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

const unwatch = Actions.amm.watchMint(config, {
  onMint(args, log) {
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

