# `token.watchRole`

Watches for role membership update events on TIP20 tokens.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"4e73bd3d320afedbf0f32a0aefd66466de2992e0fa9666c2ae0e296a1f14a4da","data":"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"}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.token.watchRole(config, {
  token: '0x...', // Address or ID of the TIP20 token
  onRoleUpdated(args, log) {
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

### onRoleUpdated

- **Type:** `function`

```ts
declare function onRoleUpdated(args: Args, log: Log): void

type Args = {
  /** Role being updated */
  role: Hex
  /** Account receiving or losing the role */
  account: Address
  /** Address that updated the role */
  sender: Address
  /** Whether the account has the role */
  hasRole: boolean
  /** Type of role update */
  type: 'granted' | 'revoked'
}
```

Callback to invoke when a role membership is updated.

### token

- **Type:** `Address | bigint`

Address or ID of the TIP20 token.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by role */
  role?: Hex | Hex[] | null
  /** Filter by account */
  account?: Address | Address[] | null
  /** Filter by sender */
  sender?: Address | Address[] | null
}
```

Filter parameters for the watch subscription.

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

- [`token.watchRole`](https://viem.sh/tempo/actions/token.watchRole)
