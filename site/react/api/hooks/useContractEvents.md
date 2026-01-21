---
title: useContractEvents
description: Hook that fetches a list of contract event logs matching the provided parameters.
---

# useContractEvents

Hook that fetches a list of contract event logs matching the provided parameters.

## Import

```ts
import { useContractEvents } from 'wagmi'
```

## Usage

By default, `useContractEvents` returns all matched events on the ABI. In practice, you must use scoping to filter for specific events.

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'

function App() {
  // Fetch event logs for every event on every ERC-20 contract. 
  const result = useContractEvents({ abi })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseContractEventsParameters } from 'wagmi'
```

### abi

`Abi`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'

function App() {
 const result = useContractEvents({
    abi, // [!code focus]
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
import { useContractEvents } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractEvents({
    address: '0x6b175474e89094c44da98b954eedeac495271d0f', // [!code focus]
    abi,
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### args

`object | readonly unknown[] | undefined`

- Logs can be scoped to given indexed arguments.
- Inferred from [`abi`](#abi) and [`eventName`](#eventname).

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractEvents({
    abi,
    eventName: 'Transfer',
    args: { // [!code focus]
      from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // [!code focus]
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B' // [!code focus]
    } // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

Only indexed arguments in `event` are candidates for `args`.

An argument can also be an array to indicate that other values can exist in the position:

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractEvents({
    abi,
    eventName: 'Transfer',
    args: { 
      from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 
      to: [ // [!code focus]
        '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
        '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac', // [!code focus]
        '0xa152f8bb749c55e9943a3a0a3111d18ee2b3f94e', // [!code focus]
    ], // [!code focus]
    }
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::


### blockHash

`` `0x${string}` | undefined ``

- Block hash to include logs from. Mutually exclusive with `fromBlock`/`toBlock`.

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useContractEvents({
    abi,
    blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
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
import { useContractEvents } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'
import { abi } from './abi'

function App() {
  const result = useContractEvents({
    abi,
    chainId: mainnet.id, // [!code focus]
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
import { useContractEvents } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useContractEvents({
    abi,
    config, // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### eventName

`string | undefined`

- Event to filter for the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useContractEvents({
    abi,
    eventName: 'Transfer', // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### fromBlock

`bigint | 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

- Block to start including logs from. Mutually exclusive with `blockHash`.

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useContractEvents({
    abi,
    fromBlock: 69420n, // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### strict

`boolean | undefined`

- Flag to only return logs that conform to the indexed & non-indexed arguments on the `event`, meaning that `args` will always be defined. Defaults to `false`.

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useContractEvents({
    abi,
    strict: true, // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### toBlock

`bigint | 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

- Block to stop including logs from. Mutually exclusive with `blockHash`.

::: code-group
```tsx [index.tsx]
import { useContractEvents } from 'wagmi'
import { abi } from './abi'
import { config } from './config'

function App() {
  const result = useContractEvents({
    abi,
    toBlock: 70120n, // [!code focus]
  })
}
```
<<< @/snippets/abi-event.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseContractEventsReturnType } from 'wagmi'
```

A list of event logs.

## Action

- [`getContractEvents`](/core/api/actions/getContractEvents)
