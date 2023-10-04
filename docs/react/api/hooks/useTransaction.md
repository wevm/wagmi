---
title: useTransaction
description: Hook for fetching transactions given hashes or block identifiers.
---

# useTransaction

Hook for fetching transactions given hashes or block identifiers.

## Import

```ts
import { useTransaction } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useTransaction } from 'wagmi'

function App() {
  const result = useTransaction({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTransactionParameters } from 'wagmi'
```

---

### blockHash

`bigint | undefined`

Block hash to get transaction at (with [`index`](#index)).

```ts
import { useTransaction } from 'wagmi'

function App() {
  const result = useTransaction({
    blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
    index: 0,
  })
}
```

### blockNumber

`bigint | undefined`

Block number to get transaction at (with [`index`](#index)).

```ts
import { useTransaction } from 'wagmi'

function App() {
  const result = useTransaction({
    blockNumber: 17829139n, // [!code focus]
    index: 0,
  })
}
```

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get transaction at (with [`index`](#index)).

```ts
import { useTransaction } from 'wagmi'

function App() {
  const result = useTransaction({
    blockTag: 'safe', // [!code focus]
    index: 0,
  })
}
```

---

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```ts
import { useTransaction } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useTransaction({
    chainId: mainnet.id, // [!code focus]
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5',
  })
}
```

### hash

`` `0x${string}` | undefined ``

Hash to get transaction.

```ts
import { useTransaction } from 'wagmi'

function App() {
  const result = useTransaction({
    hash: '0x0fa64daeae54e207aa98613e308c2ba8abfe274f75507e741508cc4db82c8cb5', // [!code focus]
  })
}
```

### index

`number | undefined`

An index to be used with a block identifier ([hash](#blockhash), [number](#blocknumber), or [tag](#blocktag)).

```ts
import { useTransaction } from 'wagmi'

function App() {
  const result = useTransaction({
    blockTag: 'safe',
    index: 0  // [!code focus]
  })
}
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTransactionReturnType } from 'wagmi'
```

## Action

- [`getTransaction`](/core/api/actions/getTransaction)
