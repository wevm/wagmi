---
title: useStorageAt
description: Hook for returning the value from a storage slot at a given address.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getStorageAt'
const typeName = 'GetStorageAt'
const TData = 'GetStorageAtData'
const TError = 'GetStorageAtErrorType'
</script>

# useStorageAt

Hook for for returning the value from a storage slot at a given address.

## Import

```ts
import { useStorageAt } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useStorageAt } from 'wagmi'

function App() {
  const result = useStorageAt({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    slot: '0x0',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseStorageAtParameters } from 'wagmi'
```

### address

`Address | undefined`

The contract address.

::: code-group
```tsx [index.tsx]
import { useStorageAt } from 'wagmi'

function App() {
  const result = useStorageAt({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
    slot: '0x0',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### slot

`Hex | undefined`

The storage position (as a hex encoded value).

::: code-group
```tsx [index.tsx]
import { useStorageAt } from 'wagmi'

function App() {
  const result = useStorageAt({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    slot: '0x0', // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## blockNumber

`bigint | undefined`

The block number to check the storage at.

::: code-group
```tsx [index.tsx]
import { useStorageAt } from 'wagmi'

function App() {
  const result = useStorageAt({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    blockNumber: 16280770n, // [!code focus]
    slot: '0x0',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to check the storage at.

::: code-group
```tsx [index.tsx]
import { useStorageAt } from 'wagmi'

function App() {
  const result = useStorageAt({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    blockTag: 'safe', // [!code focus]
    slot: '0x0',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The chain ID to check the storage at.

::: code-group
```tsx [index.tsx]
import { useStorageAt } from 'wagmi'
import { mainnet } from '@wagmi/core/chains'

function App() {
  const result = useStorageAt({
    chainId: mainnet.id, // [!code focus]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    slot: '0x0',
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
import { useStorageAt } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useStorageAt({
    config, // [!code focus]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    slot: '0x0',
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
import { useStorageAt } from 'wagmi'
import { config } from './config'

function App() {
  const result = useStorageAt({
    scopeKey: 'foo' // [!code focus]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    slot: '0x0',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseStorageAtReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getStorageAt`](/core/api/actions/getStorageAt)
