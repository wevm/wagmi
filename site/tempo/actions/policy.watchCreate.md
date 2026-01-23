# `policy.watchCreate`

Watches for policy creation events on the TIP403 Registry.

## Usage

::: code-group

```ts twoslash [example.ts]
// @twoslash-cache: {"v":1,"hash":"4175566a55e750e5214e1ba28bd900a36c6ad75d45fe9a2ac4e16980d28c414b","data":"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="}
// @filename: config.ts
// @errors: 2322
import type { Config } from 'wagmi'
export const config = {} as Config
// @filename: example.ts
// ---cut---
import { Actions } from 'wagmi/tempo'
import { config } from './config'

const unwatch = Actions.policy.watchCreate(config, {
  onPolicyCreated(args, log) {
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

### onPolicyCreated

- **Type:** `function`

```ts
declare function onPolicyCreated(args: Args, log: Log): void

type Args = {
  /** ID of the created policy */
  policyId: bigint
  /** Type of policy */
  type: PolicyType
  /** Address that created the policy */
  updater: Address
}
```

Callback to invoke when a policy is created.

### args (optional)

- **Type:** `object`

```ts
type Args = {
  /** Filter by policy ID */
  policyId?: bigint | bigint[] | null
  /** Filter by updater address */
  updater?: Address | Address[] | null
}
```

Optional filter arguments to narrow which events to watch.

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

- [`policy.watchCreate`](https://viem.sh/tempo/actions/policy.watchCreate)
