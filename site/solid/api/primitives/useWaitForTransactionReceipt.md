---
title: useWaitForTransactionReceipt
description: Primitive that waits for the transaction to be included on a block, and then returns the transaction receipt.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'waitForTransactionReceipt'
const typeName = 'WaitForTransactionReceipt'
const TData = 'WaitForTransactionReceiptData'
const TError = 'WaitForTransactionReceiptErrorType'
</script>

# useWaitForTransactionReceipt

Primitive that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.

## Import

```ts
import { useWaitForTransactionReceipt } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useWaitForTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

## Parameters

```ts
import { useWaitForTransactionReceipt } from '@wagmi/solid'

useWaitForTransactionReceipt.Parameters
useWaitForTransactionReceipt.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useWaitForTransactionReceipt(() => ({
  hash: '0x...',
  // other parameters...
}))
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```ts [index.ts]
import { useWaitForTransactionReceipt } from '@wagmi/solid'
import { mainnet } from '@wagmi/solid/chains'

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    chainId: mainnet.id, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

::: code-group
```tsx [index.tsx]
import { useWaitForTransactionReceipt } from '@wagmi/solid'
import { config } from './config' // [!code focus]

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    config, // [!code focus]
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

### confirmations

`number | undefined`

The number of confirmations (blocks that have passed) to wait before resolving.

```ts [index.ts]
import { useWaitForTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    confirmations: 2, // [!code focus]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  }))
}
```

### onReplaced

`
(({ reason: 'replaced' | 'repriced' | 'cancelled'; replacedTransaction: Transaction; transaction: Transaction; transactionReceipt: TransactionReceipt }) => void) | undefined
`

Optional callback to emit if the transaction has been replaced.

```ts [index.ts]
import { useWaitForTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    onReplaced: replacement => console.log(replacement), // [!code focus]
  }))
}
```

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/solid/api/createConfig#pollinginterval).

```ts [index.ts]
import { useWaitForTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    pollingInterval: 1_000, // [!code focus]
  }))
}
```

### hash

`` `0x${string}` | undefined ``

The transaction hash to wait for. [`enabled`](#enabled) set to `false` if `hash` is `undefined`.

```ts [index.ts]
import { useWaitForTransactionReceipt } from '@wagmi/solid'

function App() {
  const result = useWaitForTransactionReceipt(() => ({
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
  }))
}
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useWaitForTransactionReceipt } from '@wagmi/solid'

useWaitForTransactionReceipt.ReturnType
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`waitForTransactionReceipt`](/core/api/actions/waitForTransactionReceipt)
