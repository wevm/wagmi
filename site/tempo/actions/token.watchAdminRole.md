# `token.watchAdminRole`

Watches for role admin update events on TIP20 tokens.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"c420598bc27431292ec1a4b52f62cd46424331fc2b9c562b34ffb419fe3f27be","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.token.watchAdminRole(config, {
  token: 1n, // Token ID or address
  onRoleAdminUpdated(args, log) {
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

### onRoleAdminUpdated

- **Type:** `function`

```ts
declare function onRoleAdminUpdated(args: Args, log: Log): void

type Args = {
  /** The role whose admin role is being changed */
  role: Hex
  /** The new admin role */
  newAdminRole: Hex
  /** The address that initiated the change */
  sender: Address
}
```

Callback to invoke when a role admin is updated.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token to watch.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by role */
  role?: Hex | Hex[] | null
  /** Filter by new admin role */
  newAdminRole?: Hex | Hex[] | null
  /** Filter by sender */
  sender?: Address | Address[] | null
}
```

Optional filter arguments to narrow down the events to watch.

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

- [`token.watchAdminRole`](https://viem.sh/tempo/actions/token.watchAdminRole)
