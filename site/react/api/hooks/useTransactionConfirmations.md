---
title: useTransactionConfirmations
description: Hook for fetching the number of blocks passed (confirmations) since the transaction was processed on a block.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getTransactionConfirmations'
const typeName = 'GetTransactionConfirmations'
const TData = 'GetTransactionConfirmationsData'
const TError = 'GetTransactionConfirmationsErrorType'
</script>

# useTransactionConfirmations

Hook for fetching the number of blocks passed (confirmations) since the transaction was processed on a block. If confirmations is 0, then the Transaction has not been confirmed & processed yet.

## Import

```ts
import { useTransactionConfirmations } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useTransactionConfirmations } from 'wagmi'

function App() {
  const result = useTransactionConfirmations({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTransactionConfirmationsParameters } from 'wagmi'
```

---

### hash

`` `0x${string}` | undefined ``

The hash of the transaction.

```ts
import { useTransactionConfirmations } from 'wagmi'

function App() {
  const result = useTransactionConfirmations({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5', // [!code focus]
  })
}
```

### transactionReceipt

`TransactionReceipt | undefined`

The transaction receipt.

```ts
import { useTransactionConfirmations } from 'wagmi'

function App() {
  const result = useTransactionConfirmations({
    transactionReceipt: { ... }, // [!code focus]
  })
}
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```ts
import { useTransactionConfirmations } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useTransactionConfirmations({
    chainId: mainnet.id, // [!code focus]
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  })
}
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useTransactionConfirmations } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useTransactionConfirmations({
    config, // [!code focus]
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
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
  const result = useTransactionConfirmations({
    scopeKey: 'foo' // [!code focus]
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTransactionConfirmationsReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransactionConfirmations`](/core/api/actions/getTransactionConfirmations)
