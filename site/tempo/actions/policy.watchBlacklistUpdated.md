# `policy.watchBlacklistUpdated`

Watches for blacklist update events on the TIP403 Registry.  

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"9b1d65086b67741e13cb6c063a4e3c7d1060b98061ad9be94ac501be7904f5a6","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
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

<<< @/snippets/react/config-tempo.ts{ts} [config.ts]

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
