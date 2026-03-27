---
title: useWatchContractEvent
description: Primitive that watches and returns emitted contract event logs.
---

# useWatchContractEvent

Primitive that watches and returns emitted contract event logs.

## Import

```ts
import { useWatchContractEvent } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchContractEvent } from '@wagmi/solid'
import { abi } from './abi'

function App() {
  useWatchContractEvent(() => ({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useWatchContractEvent } from '@wagmi/solid'

useWatchContractEvent.Parameters
useWatchContractEvent.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useWatchContractEvent(() => ({
  address: '0x...',
  abi,
  eventName: 'Transfer',
  onLogs(logs) { ... },
}))
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/solid/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

### address

`Address | undefined`

The contract's address.

### args

`object | readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`eventName`](#eventname).

### batch

`boolean | undefined`

- Whether or not the events should be batched on each invocation.
- Defaults to `true`.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### enabled

`boolean | undefined`

- Whether or not to watch for events.
- Defaults to `true`.

### eventName

`string`

- Event to listen for the contract.
- Inferred from [`abi`](#abi).

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block number.

### onLogs

`(logs: Log[], prevLogs: Log[] | undefined) => void`

Callback for when logs changes.

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

### strict

`boolean | undefined`

- Defaults to `false`.

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

## Return Type

```ts
import { useWatchContractEvent } from '@wagmi/solid'

useWatchContractEvent.ReturnType
```

Primitive returns `void`.

## Action

- [`watchContractEvent`](/core/api/actions/watchContractEvent)
