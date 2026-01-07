# Agent Guidelines

Agent guidance for the Wagmi documentation site.

> **Communication Style**: Be brief, concise. Maximize information density, minimize tokens. Incomplete sentences acceptable when clear. Remove filler words. Prioritize clarity over grammar.

## Tempo

- All Tempo documentation must be added under the `/tempo` sidebar item.

## Wagmi Actions

- **All documentation must be based on their corresponding Wagmi actions** from `@wagmi/core/tempo` (`packages/core/src/tempo/`)
- Make sure you update `site/tempo/actions/index.md` for new actions

### Query Actions

````md
# `namespace.action`

description

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

const result = await Actions.amm.action(config, {
  foo: '0x...',
  bar: 123n,
})

console.log('Result:', result)
// @log: Result: 10500000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Return Type

`bigint`

description

## Parameters

### foo

- **Type:** `Address`

description

### bar

- **Type:** `bigint`

description

### baz (optional)

- **Type:** `Hex`

description

## Viem

- [`namespace.action`](https://viem.sh/tempo/actions/namespace.action)
````

### Mutation Actions

````md
# `namespace.action`

description

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

const result =
  await Actions.namespace.actionSync(config, {
    foo: '0x...',
    bar: 123n,
  })

console.log('Foo:', result.foo)
// @log: Foo: 5250000000000000000n
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `namespace.action` action and wait for inclusion manually:

```ts
import { Actions as viem_Actions } from 'viem/tempo'
import { Actions } from 'wagmi/tempo'
import { waitForTransactionReceipt } from 'wagmi/actions'

const hash = await Actions.namespace.action(config, {
  foo: '0x...',
  bar: 123n,
})
const receipt = await waitForTransactionReceipt(config, { hash })

const { args: { baz } } 
  = viem_Actions.namespace.action.extractEvent(receipt.logs)
```

## Return Type

description

```ts
type ReturnType = {
  /** description */
  baz: bigint
}
```

## Parameters

### foo

- **Type:** `Address`

description

### bar

- **Type:** `bigint`

description

<!--@include: @shared/tempo-write-parameters.md-->

## Viem

- [`namespace.action`](https://viem.sh/tempo/actions/namespace.action)
````

### Watch Actions

````md
# `namespace.watchAction`

description

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

const unwatch = Actions.namespace.watchAction(config, {
  onAction(args, log) {
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

### onAction

- **Type:** `function`

```ts
declare function onBurn(args: Args, log: Log): void

type Args = {
  /** description */
  foo: bigint
  /** description */
  barBaz: bigint
}
```

Callback to invoke when action occurs.

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

- [`namespace.action`](https://viem.sh/tempo/actions/namespace.action)
````

## Wagmi Hooks

- **All documentation must be based on their corresponding Wagmi hooks** from `wagmi/tempo` (`packages/react/src/tempo/`)
- Make sure you update `site/tempo/hooks/index.md` for new actions

### Query Hooks

An example of a generated hook set can be found in `hooks/amm.useLiquidityBalance.ts`. Template example:

````md
# `namespace.useHook`

description

## Usage

::: code-group
```ts twoslash [example.ts]
import { Hooks } from 'wagmi/tempo'

const { data: result } = Hooks.namespace.useHook({
  foo: '0x...',
  bar: 123n,
})

console.log('Result:', resut)
// @log: Result: ...
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Return Type

See [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook return types.

### data

See [Wagmi Action `namespace.action` Return Type](/tempo/actions/namespace.action#return-type)

## Parameters

See [Wagmi Action `namespace.action` Parameters](/tempo/actions/namespace.action#parameters)

### query

See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for more info hook parameters.

## Action

- [`namespace.action`](/tempo/actions/namespace.action)
````

### Mutation Hooks

````md
# `namespace.useHook`

description

## Usage

::: code-group
```ts twoslash [example.ts]
import { Hooks } from 'wagmi/tempo'

const actionNameSync = Hooks.namespace.useHookSync()

// Call `mutate` in response to user action (e.g. button click, form submission)
actionNameSync.mutate({
  foo: '0x...',
  bar: 123n,
})

console.log('Received baz:', actionNameSync.data?.baz)
// @log: Received baz: ...
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

### Asynchronous Usage

The example above uses a `*Sync` variant of the action, that will wait for the transaction to be included before returning.

If you are optimizing for performance, you should use the non-sync `amm.burn` action and wait for inclusion manually:

```ts
import { Actions } from 'viem/tempo'
import { Hooks } from 'wagmi/tempo'
import { useWaitForTransactionReceipt } from 'wagmi'

const actionName = Hooks.namespace.useHook()
const { data: receipt } = useWaitForTransactionReceipt({ hash: actionName.data })

// Call `mutate` in response to user action (e.g. button click, form submission)
actionName.mutate({
  foo: '0x...',
  bar: 123n,
})

if (receipt) {
  const { args: { baz } } 
    = Actions.namespace.action.extractEvent(receipt.logs)
}
```

## Return Type

See [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook return types.

### data

See [Wagmi Action `namespace.action` Return Type](/tempo/actions/namespace.action#return-type)

### mutate/mutateAsync

See [Wagmi Action `namespace.action` Parameters](/tempo/actions/namespace.action#parameters)

## Parameters

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

### mutation

See the [TanStack Query mutation docs](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation) for more info hook parameters.

## Action

- [`namespace.action`](/tempo/actions/namespace.action)
````

### Watch Hooks

````md
# `namespace.useWatchHook`

description

## Usage

::: code-group
```ts twoslash [example.ts]
import { Hooks } from 'wagmi/tempo'

Hooks.amm.useWatchHook({
  onAction(args, log) {
    console.log('args:', args)
  },
})
```
<<< @/snippets/react/config-tempo.ts{ts} [config.ts]
:::

## Parameters

See [Wagmi Action `namespace.watchAction` Parameters](/tempo/actions/namespace.watchAction#parameters)

### config

`Config | undefined`

[`Config`](https://wagmi.sh/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider).

## Action

- [`namespace.action`](/tempo/actions/namespace.action)
- [`namespace.watchAction`](/tempo/actions/namespace.watchAction)
````
