---
title: useEstimateMaxPriorityFeePerGas
description: Hook for fetching an estimate for the max priority fee per gas (in wei) for a transaction to be likely included in the next block.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'estimateMaxPriorityFeePerGas'
const typeName = 'EstimateMaxPriorityFeePerGas'
const TData = 'bigint'
const TError = 'EstimateMaxPriorityFeePerGasErrorType'
</script>

# useEstimateMaxPriorityFeePerGas

Hook for fetching an estimate for the fees per gas (in wei) for a transaction to be likely included in the next block.

## Import

```ts
import { useEstimateMaxPriorityFeePerGas } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useEstimateMaxPriorityFeePerGas } from 'wagmi'

function App() {
  const result = useEstimateMaxPriorityFeePerGas()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseEstimateMaxPriorityFeePerGas } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useEstimateMaxPriorityFeePerGas } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useEstimateMaxPriorityFeePerGas({
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
import { useEstimateMaxPriorityFeePerGas } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useEstimateMaxPriorityFeePerGas({
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
```ts [index.ts]
import { useEstimateMaxPriorityFeePerGas } from 'wagmi'

function App() {
  const result = useEstimateMaxPriorityFeePerGas({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEstimateMaxPriorityFeePerGasReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`estimateMaxPriorityFeePerGas`](/core/api/actions/estimateMaxPriorityFeePerGas)
