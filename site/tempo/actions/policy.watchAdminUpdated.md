# `policy.watchAdminUpdated`

Watches for policy admin update events on the TIP403 Registry.

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

const unwatch = Actions.policy.watchAdminUpdated(config, {
  onAdminUpdated(args, log) {
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

### onAdminUpdated

- **Type:** `function`

```ts
declare function onAdminUpdated(args: Args, log: Log): void

type Args = {
  /** ID of the policy */
  policyId: bigint
  /** Address that updated the admin */
  updater: Address
  /** Address of the admin */
  admin: Address
}
```

Callback to invoke when a policy admin is updated.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by policy ID */
  policyId?: bigint | bigint[] | null
  /** Filter by updater address */
  updater?: Address | Address[] | null
  /** Filter by admin address */
  admin?: Address | Address[] | null
}
```

Optional filter arguments for the event.

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

- [`policy.watchAdminUpdated`](https://viem.sh/tempo/actions/policy.watchAdminUpdated)
