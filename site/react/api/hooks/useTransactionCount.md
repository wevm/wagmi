---
title: useTransactionCount
description: Hook for fetching the number of transactions an Account has broadcast / sent.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getTransactionCount'
const typeName = 'GetTransactionCount'
const TData = 'number'
const TError = 'GetTransactionCountErrorType'
</script>

# useTransactionCount

Hook for fetching the number of transactions an Account has sent.

## Import

```ts
import { useTransactionCount } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useTransactionCount } from 'wagmi'

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTransactionCountParameters } from 'wagmi'
```

### address

`Address | undefined`

Address to get the transaction count for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

::: code-group
```tsx [index.tsx]
import { useTransactionCount } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### blockNumber

`bigint | undefined`

Block number to get the transaction count at.

::: code-group
```ts [index.ts]
import { useTransactionCount } from 'wagmi'

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    blockNumber: 17829139n, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get the transaction count at.

::: code-group
```ts [index.ts]
import { useTransactionCount } from 'wagmi'

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    blockTag: 'latest', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useTransactionCount } from 'wagmi'
import { mainnet } from 'wagmi/chains' // [!code focus]

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
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
import { useTransactionCount } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
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
import { useTransactionCount } from 'wagmi'

function App() {
  const result = useTransactionCount({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    scopeKey: 'foo', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTransactionCountReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransactionCount`](/core/api/actions/getTransactionCount)
