---
title: useWatchContractEvent
description: Hook that watches and returns emitted contract event logs.
---

# useWatchContractEvent

Hook that watches and returns emitted contract event logs.

## Import

```ts
import { useWatchContractEvent } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchContractEventParameters } from 'wagmi'
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi, // [!code focus]
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### address

`Address | undefined`

The contract's address.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### args

`object | readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`eventName`](#eventname).

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    args: { // [!code focus]
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B' // [!code focus]
    } // [!code focus]
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### batch

`boolean | undefined`

- Whether or not the events should be batched on each invocation.
- Defaults to `true`.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    batch: false, // [!code focus]
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    chainId: 1, // [!code focus]
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    config, // [!code focus]
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### eventName

`string`

- Event to listen for the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer', // [!code focus]
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block number.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    onError(error) { // [!code focus]
      console.log('Error', error) // [!code focus]
    } // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### onLogs

`(logs: Log[], prevLogs: Log[] | undefined) => void`

Callback for when logs changes.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) { // [!code focus]
      console.log('New logs!', logs) // [!code focus]
    } // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    poll: true // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    pollingInterval: 1_000 // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### strict

`boolean | undefined`

- Defaults to `false`.

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    strict: true // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from 'wagmi'
import { abi } from './abi'

function App() {
  useWatchContractEvent({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    syncConnectedChain: true // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseWatchContractEventReturnType } from 'wagmi'
```

Hook returns `void`

## Action

- [`watchContractEvent`](/core/api/actions/watchContractEvent)
