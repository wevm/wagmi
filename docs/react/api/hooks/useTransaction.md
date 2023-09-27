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

## Return Type

```ts
import { type UseTransactionReturnType } from 'wagmi'
```

## Action

- [`getTransaction`](/core/api/actions/getTransaction)
