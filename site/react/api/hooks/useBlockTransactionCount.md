---
title: useBlockTransactionCount
description: Hook for fetching the number of Transactions at a block number, hash or tag.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getBlockTransactionCount'
const typeName = 'GetBlockTransactionCount'
const TData = 'bigint'
const TError = 'GetBlockTransactionCountErrorType'
</script>

# useBlockTransactionCount

Hook for fetching the number of Transactions at a block number, hash or tag.

## Import

```ts
import { useBlockTransactionCount } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlockTransactionCount } from 'wagmi'

function App() {
  const result = useBlockTransactionCount()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBlockTransactionCountParameters } from 'wagmi'
```

### blockHash

`` `0x${string}` ``

Transaction count at a given block hash.

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

Transaction count at a given block number.

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

Transaction count at a given block tag. Defaults to `'latest'`.

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

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useBlockTransactionCount } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBlockTransactionCount({
    config, // [!code focus]
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
import { useBlockTransactionCount } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBlockTransactionCount({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::


<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBlockTransactionCountReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBlockTransactionCount`](/core/api/actions/getBlockTransactionCount)
