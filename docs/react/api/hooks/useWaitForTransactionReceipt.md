---
title: useWaitForTransactionReceipt
description: Hook that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.
---

# useWaitForTransactionReceipt

Hook that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.

## Import

```ts
import { useWaitForTransactionReceipt } from 'wagmi'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWaitForTransactionReceipt } from 'wagmi'

function App() {
  const result = useWaitForTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseWaitForTransactionReceiptParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseWaitForTransactionReceiptReturnType } from 'wagmi'
```

## Action

- [`waitForTransactionReceipt`](/core/api/actions/waitForTransactionReceipt)
