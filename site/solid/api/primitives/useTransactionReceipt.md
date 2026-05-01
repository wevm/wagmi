---
title: useTransactionReceipt
description: Primitive for returning the Transaction Receipt given a Transaction hash.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'getTransactionReceipt'
const typeName = 'GetTransactionReceipt'
const TData = 'GetTransactionReceiptData'
const TError = 'GetTransactionReceiptErrorType'
</script>

# useTransactionReceipt

Primitive for returning the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash.

## Import

```ts
import { useTransactionReceipt } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useTransactionReceipt } from '@wagmi/solid'

useTransactionReceipt.Parameters
useTransactionReceipt.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useTransactionReceipt(() => ({
  hash: '0x...',
  // other parameters...
}))
```

### hash

`` `0x${string}` | undefined ``

A transaction hash.

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to return the transaction receipt from.

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from '@wagmi/solid'
import { mainnet } from '@wagmi/solid/chains'

function App() {
  const result = useTransactionReceipt(() => ({
    chainId: mainnet.id, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from '@wagmi/solid'
import { config } from './config' // [!code focus]

function App() {
  const result = useTransactionReceipt(() => ({
    config, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Primitives that have identical context will share the same cache.

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from '@wagmi/solid'
import { config } from './config'

function App() {
  const result = useTransactionReceipt(() => ({
    scopeKey: 'foo', // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useTransactionReceipt } from '@wagmi/solid'

useTransactionReceipt.ReturnType
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransactionReceipt`](/core/api/actions/getTransactionReceipt)
