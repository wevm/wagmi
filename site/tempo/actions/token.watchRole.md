# `token.watchRole`

Watches for role membership update events on TIP20 tokens.

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

const unwatch = Actions.token.watchRole(config, {
  token: '0x...', // Address or ID of the TIP20 token
  onRoleUpdated(args, log) {
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
