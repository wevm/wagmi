# `amm.watchBurn`

Watches for liquidity burn events on the Fee AMM.

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

const unwatch = Actions.amm.watchBurn(config, {
  onBurn(args, log) {
    console.log('args:', args)
  },
})

// Later, stop watching
unwatch()
```
<<< @/snippets/core/config-tempo.ts{ts twoslash} [config.ts]
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
