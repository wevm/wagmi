# `nonce.watchActiveKeyCountChanged`

Watches for active key count changed events. This event is emitted when an account starts using a new nonce key for the first time.

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

const unwatch = Actions.nonce.watchActiveKeyCountChanged(config, {
  onActiveKeyCountChanged(args, log) {
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
