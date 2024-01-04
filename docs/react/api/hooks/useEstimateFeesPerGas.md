---
title: useEstimateFeesPerGas
description: Hook for fetching an estimate for the fees per gas (in wei) for a transaction to be likely included in the next block.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'estimateFeesPerGas'
const typeName = 'EstimateFeesPerGas'
const TData = '{ formatted: { gasPrice: string | undefined; maxFeePerGas: string | undefined; maxPriorityFeePerGas: string | undefined; }; gasPrice: bigint | undefined; maxFeePerGas: bigint | undefined; maxPriorityFeePerGas: bigint | undefined; }'
const TError = 'EstimateFeesPerGasErrorType'
</script>

# useEstimateFeesPerGas

Hook for fetching an estimate for the fees per gas (in wei) for a transaction to be likely included in the next block.

## Import

```ts
import { useEstimateFeesPerGas } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useEstimateFeesPerGas } from 'wagmi'

function App() {
  const result = useEstimateFeesPerGas()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseEstimateFeesPerGas } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useEstimateFeesPerGas } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useEstimateFeesPerGas({
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
import { useEstimateFeesPerGas } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useEstimateFeesPerGas({
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### formatUnits

`'ether' | 'gwei' | 'wei' | number | undefined`

- Units to use when formatting result.
- Defaults to `'ether'`.

::: code-group
```ts [index.ts]
import { useEstimateFeesPerGas } from 'wagmi'

function App() {
  const result = useEstimateFeesPerGas({
    formatUnits: 'ether', // [!code focus]
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
import { useEstimateFeesPerGas } from 'wagmi'

function App() {
  const result = useEstimateFeesPerGas({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### type

`'legacy' | 'eip1559'`

- Defaults to `'eip1559'`

::: code-group
```ts [index.ts]
import { useEstimateFeesPerGas } from 'wagmi'

function App() {
  const result = useEstimateFeesPerGas({
    type: 'legacy', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseEstimateFeesPerGasReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`estimateFeesPerGas`](/core/api/actions/estimateFeesPerGas)
