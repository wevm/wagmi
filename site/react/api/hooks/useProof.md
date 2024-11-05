---
title: useProof
description: Hook for return the account and storage values of the specified account including the Merkle-proof.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'getProof'
const typeName = 'GetProof'
const TData = 'GetProofData'
const TError = 'GetProofErrorType'
</script>

# useProof

Hook for return the account and storage values of the specified account including the Merkle-proof.

## Import

```ts
import { useProof } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useProof } from 'wagmi'

function App() {
  const result = useProof({
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseProofParameters } from 'wagmi'
```

### address

`Address | undefined`

The account address to get the proof for.

::: code-group
```tsx [index.tsx]
import { useProof } from 'wagmi'

function App() {
  const result = useProof({
    address: '0x4200000000000000000000000000000000000016', // [!code focus]
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### storageKeys

`` `0x${string}`[] | undefined ``

Array of storage-keys that should be proofed and included.

::: code-group
```tsx [index.tsx]
import { useProof } from 'wagmi'

function App() {
  const result = useProof({
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: [ // [!code focus:3]
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockNumber

`bigint | undefined`

Proof at a given block number.

::: code-group
```tsx [index.tsx]
import { useProof } from 'wagmi'

function App() {
  const result = useProof({
    address: '0x4200000000000000000000000000000000000016',
    blockNumber: 42069n, // [!code focus]
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Proof at a given block tag.

::: code-group
```tsx [index.tsx]
import { useProof } from 'wagmi'

function App() {
  const result = useProof({
    address: '0x4200000000000000000000000000000000000016',
    blockTag: 'latest', // [!code focus]
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to get the proof for.

::: code-group
```tsx [index.tsx]
import { useProof } from 'wagmi'
import { optimism } from 'wagmi/chains'

function App() {
  const result = useProof({
    chainId: optimism.id, // [!code focus]
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
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
import { useProof } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useProof({
    config, // [!code focus]
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
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
import { useProof } from 'wagmi'
import { config } from './config'

function App() {
  const result = useProof({
    scopeKey: 'foo' // [!code focus]
    address: '0x4200000000000000000000000000000000000016',
    storageKeys: [
      '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
    ],
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseProofReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getProof`](/core/api/actions/getProof)
