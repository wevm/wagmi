---
title: useWatchPendingTransactions
description: Hook that watches and returns pending transaction hashes.
---

# useWatchPendingTransactions

Hook that watches and returns pending transaction hashes.

## Import

```ts
import { useWatchPendingTransactions } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchPendingTransactionsParameters } from 'wagmi'
```

### batch

`boolean | undefined`

- Whether or not the transactions should be batched on each invocation.
- Defaults to `true`.

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    batch: true // [!code focus]
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    chainId: 1 // [!code focus]
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'
import { config } from './config'

function App() {
  useWatchPendingTransactions({
    config // [!code focus]
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from watching pending transactions.

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onError(error) { // [!code focus]
      console.log('Error', error) // [!code focus]
    }, // [!code focus]
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### onTransactions

`(transactions: Hash[], prevTransactions: Hash[] | undefined) => void`

Callback when new incoming pending transactions are detected.

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onTransactions(transactions) { // [!code focus]
      console.log('New transactions!', transactions) // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new pending transactions instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
    poll: true, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
    pollingInterval: 1_000, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

::: code-group
```tsx [index.tsx]
import { useWatchPendingTransactions } from 'wagmi'

function App() {
  useWatchPendingTransactions({
    onTransactions(transactions) {
      console.log('New transactions!', transactions)
    },
    syncConnectedChain: false, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseWatchPendingTransactionsReturnType } from 'wagmi'
```

## Action

- [`watchPendingTransactions`](/core/api/actions/watchPendingTransactions)
