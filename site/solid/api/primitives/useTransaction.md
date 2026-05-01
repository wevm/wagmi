---
title: useTransaction
description: Primitive for fetching transactions given hashes or block identifiers.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'getTransaction'
const typeName = 'GetTransaction'
const TData = 'GetTransactionData'
const TError = 'GetTransactionErrorType'
</script>

# useTransaction

Primitive for fetching transactions given hashes or block identifiers.

## Import

```ts
import { useTransaction } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useTransaction } from '@wagmi/solid'

function App() {
  const result = useTransaction(() => ({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useTransaction } from '@wagmi/solid'

useTransaction.Parameters
useTransaction.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useTransaction(() => ({
  hash: '0x...',
  // other parameters...
}))
```

### blockHash

`bigint | undefined`

Block hash to get transaction at (with [`index`](#index)).

```ts
import { useTransaction } from '@wagmi/solid'

function App() {
  const result = useTransaction(() => ({
    blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
    index: 0,
  }))
}
```

### blockNumber

`bigint | undefined`

Block number to get transaction at (with [`index`](#index)).

```ts
import { useTransaction } from '@wagmi/solid'

function App() {
  const result = useTransaction(() => ({
    blockNumber: 17829139n, // [!code focus]
    index: 0,
  }))
}
```

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get transaction at (with [`index`](#index)).

```ts
import { useTransaction } from '@wagmi/solid'

function App() {
  const result = useTransaction(() => ({
    blockTag: 'safe', // [!code focus]
    index: 0,
  }))
}
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```ts
import { useTransaction } from '@wagmi/solid'
import { mainnet } from '@wagmi/solid/chains'

function App() {
  const result = useTransaction(() => ({
    chainId: mainnet.id, // [!code focus]
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  }))
}
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useTransaction } from '@wagmi/solid'
import { config } from './config' // [!code focus]

function App() {
  const result = useTransaction(() => ({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
    config, // [!code focus]
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

### hash

`` `0x${string}` | undefined ``

Hash to get transaction. [`enabled`](#enabled) set to `false` if `hash` and [`index`](#index) are `undefined`.

```ts
import { useTransaction } from '@wagmi/solid'

function App() {
  const result = useTransaction(() => ({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5', // [!code focus]
  }))
}
```

### index

`number | undefined`

An index to be used with a block identifier ([hash](#blockhash), [number](#blocknumber), or [tag](#blocktag)). [`enabled`](#enabled) set to `false` if `index` and [`hash`](#hash) are `undefined`.

```ts
import { useTransaction } from '@wagmi/solid'

function App() {
  const result = useTransaction(() => ({
    blockTag: 'safe',
    index: 0  // [!code focus]
  }))
}
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useTransaction } from '@wagmi/solid'

useTransaction.ReturnType
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransaction`](/core/api/actions/getTransaction)
