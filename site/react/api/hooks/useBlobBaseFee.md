---
title: useBlobBaseFee
description: Hook for fetching the current blob base fee (in wei).
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getBlobBaseFee'
const typeName = 'GetBlobBaseFee'
const TData = 'bigint'
const TError = 'GetBlobBaseFeeErrorType'
</script>

# useBlobBaseFee

Hook for fetching the current blob base fee (in wei).

## Import

```ts
import { useBlobBaseFee } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlobBaseFee } from 'wagmi'

function App() {
  const result = useBlobBaseFee()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseBlobBaseFeeParameters } from 'wagmi'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useBlobBaseFee } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useBlobBaseFee({
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
import { useBlobBaseFee } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBlobBaseFee({
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
import { useBlobBaseFee } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useBlobBaseFee({
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseBlobBaseFeeReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getBlobBaseFee`](/core/api/actions/getBlobBaseFee)
