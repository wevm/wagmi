---
title: useWaitForTransactionReceipt
description: Composable that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'waitForTransactionReceipt'
const typeName = 'WaitForTransactionReceipt'
const TData = 'WaitForTransactionReceiptData'
const TError = 'WaitForTransactionReceiptErrorType'
</script>

# useWaitForTransactionReceipt

Composable that waits for the transaction to be included on a block, and then returns the transaction receipt. If the transaction reverts, then the action will throw an error. Replacement detection (e.g. sped up transactions) is also supported.

## Import

```ts
import { useWaitForTransactionReceipt } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'

const result = useWaitForTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type WaitForTransactionReceiptParameters } from '@wagmi/core'
```

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains'

const result = useWaitForTransactionReceipt({
  chainId: mainnet.id, // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useWaitForTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### confirmations

`number | undefined`

The number of confirmations (blocks that have passed) to wait before resolving.

```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'

const result = useWaitForTransactionReceipt({
  confirmations: 2, // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```

### onReplaced

`
(({ reason: 'replaced' | 'repriced' | 'cancelled'; replacedTransaction: Transaction; transaction: Transaction; transactionReceipt: TransactionReceipt }) => void) | undefined
`

Optional callback to emit if the transaction has been replaced.

```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'

const result = useWaitForTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  onReplaced: replacement => console.log(replacement), // [!code focus]
})
</script>
```

### pollingInterval

`number | undefined`

- Polling frequency (in milliseconds).
- Defaults to the [Config's `pollingInterval` config](/vue/api/createConfig#pollinginterval).

```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'

const result = useWaitForTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  pollingInterval: 1_000, // [!code focus]
})
</script>
```

### hash

`` `0x${string}` | undefined ``

The transaction hash to wait for. [`enabled`](#enabled) set to `false` if `hash` is `undefined`.

```vue [index.vue]
<script setup lang="ts">
import { useWaitForTransactionReceipt } from '@wagmi/vue'

const result = useWaitForTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
})
</script>
```

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseWaitForTransactionReceiptReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`waitForTransactionReceipt`](/core/api/actions/waitForTransactionReceipt)
