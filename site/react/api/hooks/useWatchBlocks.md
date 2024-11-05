---
title: useWatchBlocks
description: Hook that watches for block changes.
---

# useWatchBlocks

Hook that watches for block changes.

## Import

```ts
import { useWatchBlocks } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) {
      console.log('New block', block.number)
    },
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWatchBlocksParameters } from 'wagmi'
```

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to watch blocks at.

::: code-group
```ts [index.ts]
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    blockTag: 'latest', // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to watch blocks at.

::: code-group
```ts [index.ts]
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    chainId: 1, // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
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
import { useWatchBlocks } from 'wagmi'
import { config } from './config'

function App() {
  useWatchBlocks({
    config, // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    emitMissed: true, // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    emitOnBegin: true, // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    enabled: false, // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### includeTransactions

`boolean`

Whether or not to unwrap transactions as objects (instead of hashes) in blocks. Defaults to `false`.

::: code-group
```ts [index.ts]
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    includeTransactions: true, // [!code focus]
    onBlock(block) {
      console.log('New block', block.number)
    },
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

### onBlock

`(block: Block, prevblock: Block | undefined) => void`

Callback for when block changes.

::: code-group
```ts [index.ts]
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) { // [!code focus]
      console.log('New block', block.number) // [!code focus]
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) { 
      console.log('New block', block.number) 
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) { 
      console.log('New block', block.number) 
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) { 
      console.log('New block', block.number) 
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
import { useWatchBlocks } from 'wagmi'

function App() {
  useWatchBlocks({
    onBlock(block) { 
      console.log('New block', block.number) 
    }
    syncConnectedChain: false, // [!code focus]
  })
}
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseWatchBlocksReturnType } from 'wagmi'
```

## Action

- [`watchBlocks`](/core/api/actions/watchBlocks)
