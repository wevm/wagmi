<script setup>
const packageName = '@wagmi/core'
const actionName = 'watchContractEvent'
const typeName = 'WatchContractEvent'
</script>

# watchContractEvent

Action that watches and returns emitted contract event logs.

## Import

```ts
import { watchContractEvent } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  abi,
  eventName: 'Transfer',
  onLogs(logs) {
    console.log('New logs!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts
import { type WatchContractEventParameters } from '@wagmi/core'
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi' // [!code focus]
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi, // [!code focus]
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
  abi,
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### args

`object | readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`eventName`](#eventname).

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  args: { // [!code focus]
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
  }, // [!code focus]
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### batch

`boolean | undefined`

- Whether or not the events should be batched on each invocation.
- Defaults to `true`.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  batch: false, // [!code focus]
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  chainId: mainnet.id, // [!code focus]
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### eventName

`string`

- Event to listen for the contract.
- Inferred from [`abi`](#abi).

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  eventName: 'Approval', // [!code focus]
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block number.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  onLogs(logs) { 
    console.log('Logs changed!', logs) 
  }, 
  onError(error) { // [!code focus]
    console.error('Logs error', error) // [!code focus]
  }, // [!code focus]
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### onLogs

`(logs: Log[], prevLogs: Log[] | undefined) => void`

Callback for when logs changes.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  onLogs(logs) { // [!code focus]
    console.log('Logs changed!', logs) // [!code focus]
  }, // [!code focus]
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
  poll: true, // [!code focus]
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
  pollingInterval: 1_000, // [!code focus]
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### strict

`boolean | undefined`

- Defaults to `false`.

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
  strict: true, // [!code focus]
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

::: code-group
```ts [index.ts]
import { watchContractEvent } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config'

const unwatch = watchContractEvent(config, {
  abi,
  onLogs(logs) {
    console.log('Logs changed!', logs)
  },
  syncConnectedChain: false, // [!code focus]
})
unwatch()
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type WatchContractEventReturnType } from '@wagmi/core'
```

Function for cleaning up watcher.

## Type Inference

With [`abi`](#abi) setup correctly, TypeScript will infer the correct types for [`eventName`](#eventname), [`args`](#args), and [`onLogs`](#onlogs) parameters. See the Wagmi [TypeScript docs](/core/typescript) for more information.

## Error

```ts
import { type WatchContractEventError } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`watchContractEvent`](https://viem.sh/docs/contract/watchContractEvent)
