---
title: useReadContracts
description: Hook for calling multiple read methods on a contract.
---

# useReadContracts

Hook for calling multiple read methods on a contract.

## Import

```ts
import { useReadContracts } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useReadContracts } from 'wagmi'

function App() {
  const result = useReadContracts()
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseReadContractsParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseReadContractsReturnType } from 'wagmi'
```

## Action

- [`readContracts`](/core/api/actions/readContracts)
