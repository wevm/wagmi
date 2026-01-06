# `policy.watchAdminUpdated`

Watches for policy admin update events on the TIP403 Registry.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"00763990b98b4efbcf9bd7321d9ba2c95d1dae5db8d2d85db9dc52b8f2ca0034","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
