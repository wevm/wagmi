---
title: useWaitForTransactionReceipt
description: Hook that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.
---

<script setup>
const packageName = 'wagmi'
const actionName = 'waitForTransactionReceipt'
const typeName = 'WaitForTransactionReceipt'
const TData = 'WaitForTransactionReceiptData'
const TError = 'WaitForTransactionReceiptErrorType'
</script>

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

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWaitForTransactionReceipt } from 'wagmi'
import { config } from './config' // [!code focus]

function App() {
  const result = useWaitForTransactionReceipt({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    config, // [!code focus]
  })
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

### confirmations

`number | undefined`

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

`
(({ reason: 'replaced' | 'repriced' | 'cancelled'; replacedTransaction: Transaction; transaction: Transaction; transactionReceipt: TransactionReceipt }) => void) | undefined
`

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

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/react/api/createConfig#pollinginterval).

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

`` `0x${string}` | undefined ``

The transaction hash to wait for. [`enabled`](#enabled) set to `false` if `hash` is `undefined`.

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

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`waitForTransactionReceipt`](/core/api/actions/waitForTransactionReceipt)
