# `policy.watchWhitelistUpdated`

Watches for whitelist update events on the TIP403 Registry.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"e8df301eda13d3e824a0f6ebe0befaea3f9f427a3290ede59f525defedbfdb9e","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.policy.watchWhitelistUpdated(config, {
  onWhitelistUpdated(args, log) {
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

### onWhitelistUpdated

- **Type:** `function`

```ts
declare function onWhitelistUpdated(args: Args, log: Log): void

type Args = {
  /** Address of the account */
  account: Address
  /** Whether the account is allowed */
  allowed: boolean
  /** ID of the policy */
  policyId: bigint
  /** Address that updated the whitelist */
  updater: Address
}
```

Callback to invoke when a whitelist is updated.

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

Optional filter arguments for the watch.

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

- [`policy.watchWhitelistUpdated`](https://viem.sh/tempo/actions/policy.watchWhitelistUpdated)
