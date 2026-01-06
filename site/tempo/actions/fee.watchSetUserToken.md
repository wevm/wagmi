# `fee.watchSetUserToken`

Watches for user token set events on the Fee Manager.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"466d1d7e9b6e662521a4dfa3841e61d192d4a41ddd5d17120f2190e4200b7515","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.fee.watchSetUserToken(config, {
  onUserTokenSet(args, log) {
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

### onUserTokenSet

- **Type:** `function`

```ts
declare function onUserTokenSet(args: Args, log: Log): void

type Args = {
  /** Address of the user */
  user: Address
  /** Address of the new fee token */
  token: Address
}
```

Callback to invoke when a user token is set.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Address of the user to filter by */
  user?: Address | Address[] | null
  /** Address of the token to filter by */
  token?: Address | Address[] | null
}
```

Optional filters for the event.

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

- [`fee.watchSetUserToken`](https://viem.sh/tempo/actions/fee.watchSetUserToken)
