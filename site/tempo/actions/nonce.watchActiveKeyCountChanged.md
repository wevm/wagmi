# `nonce.watchActiveKeyCountChanged`

Watches for active key count changed events. This event is emitted when an account starts using a new nonce key for the first time.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"33130951ff6b0ccac715684842211c7e0b385fe6910c618b3cec40e7133c0d12","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.nonce.watchActiveKeyCountChanged(config, {
  onActiveKeyCountChanged(args, log) {
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

### onActiveKeyCountChanged

- **Type:** `function`

```ts
declare function onActiveKeyCountChanged(args: Args, log: Log): void

type Args = {
  /** Address of the account */
  account: Address
  /** New count of active nonce keys */
  newCount: bigint
}
```

Callback to invoke when the active key count changes.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Address of the account to filter by */
  account?: Address | Address[] | null
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

- [`nonce.watchActiveKeyCountChanged`](https://viem.sh/tempo/actions/nonce.watchActiveKeyCountChanged)
