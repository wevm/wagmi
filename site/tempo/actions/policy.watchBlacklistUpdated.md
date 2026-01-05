# `policy.watchBlacklistUpdated`

Watches for blacklist update events on the TIP403 Registry.  

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

const unwatch = Actions.policy.watchBlacklistUpdated(config, {
  onBlacklistUpdated(args, log) {
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

### onBlacklistUpdated

- **Type:** `function`

```ts
declare function onBlacklistUpdated(args: Args, log: Log): void

type Args = {
  /** Address of the account */
  account: Address
  /** ID of the policy */
  policyId: bigint
  /** Whether the account is restricted */
  restricted: boolean
  /** Address that updated the blacklist */
  updater: Address
}
```

Callback to invoke when a blacklist is updated.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by policy ID */
  policyId?: bigint | bigint[] | null
  /** Filter by updater address */
  updater?: Address | Address[] | null
  /** Filter by account address */
  account?: Address | Address[] | null
}
```

Optional filter arguments to narrow the events being watched.

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

- [`policy.watchBlacklistUpdated`](https://viem.sh/tempo/actions/policy.watchBlacklistUpdated)
