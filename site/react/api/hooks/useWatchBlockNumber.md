---
title: useWatchBlockNumber
description: Hook that watches for block number changes.
---

# useWatchBlockNumber

Hook that watches for block number changes.

## Import

```ts
import { useWatchBlockNumber } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) {
      console.log('Block number changed!', blockNumber)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchBlockNumberParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to watch blocks at.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    chainId: 1, // [!code focus]
    onBlockNumber(blockNumber) {
      console.log('New block number', blockNumber)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'
import { config } from './config'

function App() {
  useWatchBlockNumber({
    config, // [!code focus]
    onBlockNumber(blockNumber) {
      console.log('New block number', blockNumber)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### emitMissed

`boolean`

Whether or not to emit missed blocks to the callback. Defaults to `false`.

Missed blocks may occur in instances where internet connection is lost, or the block time is lesser than the polling interval of the client.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    emitMissed: true, // [!code focus]
    onBlockNumber(blockNumber) {
      console.log('New block number', blockNumber)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### emitOnBegin

`boolean`

Whether or not to emit the block to the callback when the subscription opens. Defaults to `false`.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    emitOnBegin: true, // [!code focus]
    onBlockNumber(blockNumber) {
      console.log('New block number', blockNumber)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### enabled

`boolean`

Whether or not to watch for blocks. Defaults to `true`.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    enabled: false, // [!code focus]
    onBlockNumber(blockNumber) {
      console.log('New block number', blockNumber)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onBlockNumber

`(block: Block, prevblock: Block | undefined) => void`

Callback for when block changes.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) { // [!code focus]
      console.log('New block number', blockNumber) // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onError

`((error: Error) => void) | undefined`

Error thrown from getting the block.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) { 
      console.log('New block number', blockNumber) 
    }, 
    onError(error) { // [!code focus]
      console.error('Block error', error) // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### poll

`boolean | undefined`

- Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription.
- Defaults to `false` for WebSocket Clients, and `true` for non-WebSocket Clients.

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) { 
      console.log('New block number', blockNumber) 
    }
    poll: true, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/core/api/createConfig#pollinginterval).

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) { 
      console.log('New block number', blockNumber) 
    }
    pollingInterval: 1_000, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### syncConnectedChain

`boolean | undefined`

- Set up subscriber for connected chain changes.
- Defaults to [`Config['syncConnectedChain']`](/core/api/createConfig#syncconnectedchain).

::: code-group
```ts [index.ts]
import { useWatchBlockNumber } from 'wagmi'

function App() {
  useWatchBlockNumber({
    onBlockNumber(blockNumber) { 
      console.log('New block number', blockNumber) 
    }
    syncConnectedChain: false, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseWatchBlockNumberReturnType } from 'wagmi'
```

Function for cleaning up watcher.

## Action

- [`watchBlockNumber`](/core/api/actions/watchBlockNumber)
