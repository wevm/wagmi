# `token.watchAdminRole`

Watches for role admin update events on TIP20 tokens.

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

const unwatch = Actions.token.watchAdminRole(config, {
  token: 1n, // Token ID or address
  onRoleAdminUpdated(args, log) {
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
