# `fee.watchSetUserToken`

Watches for user token set events on the Fee Manager.

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

const unwatch = Actions.fee.watchSetUserToken(config, {
  onUserTokenSet(args, log) {
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
