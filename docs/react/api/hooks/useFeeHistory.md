---
title: useFeeHistory
description: Hook for fetching a collection of historical gas information.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getFeeHistory'
const typeName = 'GetFeeHistory'
const TData = 'bigint'
const TError = 'GetFeeHistoryErrorType'
</script>

# useFeeHistory

Hook for fetching a collection of historical gas information.

## Import

```ts
import { useFeeHistory } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useFeeHistory } from 'wagmi'

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    rewardPercentiles: [25, 75]
})
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseFeeHistoryParameters } from 'wagmi'
```

### blockCount

`number | undefined`

Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.

::: code-group
```tsx [index.tsx]
import { useFeeHistory } from 'wagmi'

function App() {
  const result = useFeeHistory({
    blockCount: 4, // [!code focus]
    rewardPercentiles: [25, 75]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### rewardPercentiles

`number[] | undefined`

A monotonically increasing list of percentile values to sample from each block's effective priority fees per gas in ascending order, weighted by gas used.

::: code-group
```tsx [index.tsx]
import { useFeeHistory } from 'wagmi'

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    rewardPercentiles: [25, 75] // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

Highest number block of the requested range.


::: code-group
```tsx [index.tsx]
import { useFeeHistory } from 'wagmi'

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    blockNumber: 1551231n, // [!code focus]
    rewardPercentiles: [25, 75]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag of the highest number block of the requested range.

::: code-group
```tsx [index.tsx]
import { useFeeHistory } from 'wagmi'

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    blockTag: 'safe', // [!code focus]
    rewardPercentiles: [25, 75]
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
import { useFeeHistory } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    chainId: mainnet.id, // [!code focus]
    rewardPercentiles: [25, 75]
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
import { useFeeHistory } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    rewardPercentiles: [25, 75]
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
import { useFeeHistory } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useFeeHistory({
    blockCount: 4,
    rewardPercentiles: [25, 75]
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseFeeHistoryReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getFeeHistory`](/core/api/actions/getFeeHistory)
