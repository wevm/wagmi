---
title: useTransactionReceipt
description: Hook for return the Transaction Receipt given a Transaction hash.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getTransactionReceipt'
const typeName = 'GetTransactionReceipt'
const TData = 'GetTransactionReceiptData'
const TError = 'GetTransactionReceiptErrorType'
</script>

# useTransactionReceipt

Hook for return the [Transaction Receipt](https://viem.sh/docs/glossary/terms.html#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) hash.

## Import

```ts
import { useTransactionReceipt } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from 'wagmi'

function App() {
  const result = useTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTransactionReceiptParameters } from 'wagmi'
```

### hash

`` `0x${string}` | undefined ``

A transaction hash.

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from 'wagmi'

function App() {
  const result = useTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to return the transaction receipt from.

::: code-group
```tsx [index.tsx]
import { useTransactionReceipt } from 'wagmi'
import { mainnet } from 'wagmi/chains'


function App() {
  const result = useTransactionReceipt({
    chainId: mainnet.id, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
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
import { useTransactionReceipt } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useTransactionReceipt({
    config, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
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
import { useTransactionReceipt } from 'wagmi'
import { config } from './config'

function App() {
  const result = useTransactionReceipt({
    scopeKey: 'foo' // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTransactionReceiptReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransactionReceipt`](/core/api/actions/getTransactionReceipt)
