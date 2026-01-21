# `amm.watchBurn`

Watches for liquidity burn events on the Fee AMM.

## Usage

::: code-group
```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"88643edeaab8a1c3858658b1397de9291730cd2a4ec09f2bcb6ee2f76ce6d305","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.amm.watchBurn(config, {
  onBurn(args, log) {
    console.log('args:', args)
  },
})

// Later, stop watching
unwatch()
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Return Type

`() => void`

Returns a function to unsubscribe from the event.

## Parameters

### onBurn

- **Type:** `function`

```ts
declare function onBurn(args: Args, log: Log): void

type Args = {
  /** Amount of user token received */
  amountUserToken: bigint
  /** Amount of validator token received */
  amountValidatorToken: bigint
  /** Amount of LP tokens burned */
  liquidity: bigint
  /** Address that removed liquidity */
  sender: Address
  /** Address that received the tokens */
  to: Address
  /** Address of the user token */
  userToken: Address
  /** Address of the validator token */
  validatorToken: Address
}
```

Callback to invoke when liquidity is removed.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by sender address */
  sender?: Address | Address[] | null
  /** Filter by user token address */
  userToken?: Address | Address[] | null
  /** Filter by validator token address */
  validatorToken?: Address | Address[] | null
}
```

Filter events by indexed parameters.

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

- **Type:** `function`

```ts
declare function onError(error: Error): void
```

The callback to call when an error occurred when trying to get for a new block.

### poll (optional)

- **Type:** `true`

Enable polling mode.

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to Client's pollingInterval config.

## Viem

- [`amm.watchBurn`](https://viem.sh/tempo/actions/amm.watchBurn)
