---
title: useBlock
description: Hook for fetching information about a block at a block number, hash or tag.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getBlock'
const typeName = 'GetBlock'
const TData = 'GetBlockData'
const TError = 'GetBlockErrorType'
</script>

# useBlock

Hook for fetching information about a block at a block number, hash or tag.

## Import

```ts
import { useBlock } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'

function App() {
  const result = useBlock()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBlockParameters } from 'wagmi'
```

### blockHash

`` `0x${string}` ``

Information at a given block hash.

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'

function App() {
  const result = useBlock({
    blockHash: '0x89644bbd5c8d682a2e9611170e6c1f02573d866d286f006cbf517eec7254ec2d' // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`` bigint ``

Information at a given block number.

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'

function App() {
  const result = useBlock({
    blockNumber: 42069n // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`` 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' ``

Information at a given block tag. Defaults to `'latest'`.

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'

function App() {
  const result = useBlock({
    blockTag: 'pending' // [!code focus]
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
import { useBlock } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useBlock({
    chainId: mainnet.id, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBlock({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### includeTransactions

`boolean`

Whether or not to include transactions as objects.

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBlock({
    includeTransactions: true // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Hooks that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'
import { config } from './config'

function App() {
  const result = useBlock({
    scopeKey: 'foo' // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### watch

`boolean | UseWatchBlockParameters | undefined`

- Enables/disables listening for block changes.
- Can pass a subset of [`UseWatchBlocksParameters`](/react/api/hooks/useWatchBlocks#parameters) directly to [`useWatchBlocks`](/react/api/hooks/useWatchBlocks).

::: code-group
```tsx [index.tsx]
import { useBlock } from 'wagmi'

function App() {
  const result = useBlock({
    watch: true, // [!code focus]
  })
}
```

```tsx [index-2.tsx]
import { useBlock } from 'wagmi'

function App() {
  const result = useBlock({
    watch: { // [!code focus]
      pollingInterval: 4_000, // [!code focus]
    }, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBlockReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBlock`](/core/api/actions/getBlock)
- [`watchBlockNumber`](/core/api/actions/watchBlockNumber)
