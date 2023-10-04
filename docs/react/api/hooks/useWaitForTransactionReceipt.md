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

## Parameters

```ts
import { type WaitForTransactionReceiptParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```ts [index.ts]
import { useWaitForTransactionReceipt } from 'wagmi'
import { mainnet } from 'wagmi/chains'

function App() {
  const result = useWaitForTransactionReceipt({
    chainId: mainnet.id, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  })
}
```

### confirmations

`number`

The number of confirmations (blocks that have passed) to wait before resolving.

```ts [index.ts]
import { useWaitForTransactionReceipt } from 'wagmi'

function App() {
  const result = useWaitForTransactionReceipt({
    confirmations: 2, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  })
}
```

### onReplaced

```
({ 
  reason: 'replaced' | 'repriced' | 'cancelled', 
  replacedTransaction: Transaction, 
  transaction: Transaction, 
  transactionReceipt: TransactionReceipt 
}) => void
```

Optional callback to emit if the transaction has been replaced.

```ts [index.ts]
import { useWaitForTransactionReceipt } from 'wagmi'

function App() {
  const result = useWaitForTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    onReplaced: replacement => console.log(replacement), // [!code focus]
  })
}
```

### pollingInterval

`number`

Polling frequency (in ms). Defaults to the [Config's `pollingInterval` config](/react/api/createConfig#pollinginterval).

```ts [index.ts]
import { useWaitForTransactionReceipt } from 'wagmi'

function App() {
  const result = useWaitForTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    pollingInterval: 1_000, // [!code focus]
  })
}
```

### hash

`"0x${string}"`

The transaction hash to wait for.

```ts [index.ts]
import { useWaitForTransactionReceipt } from 'wagmi'

function App() {
  const result = useWaitForTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
  })
}
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseWaitForTransactionReceiptReturnType } from 'wagmi'
```

## Action

- [`waitForTransactionReceipt`](/core/api/actions/waitForTransactionReceipt)
