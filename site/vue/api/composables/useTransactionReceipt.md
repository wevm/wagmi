---
title: useTransactionReceipt
description: Composable for return the Transaction Receipt given a Transaction hash.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'getTransactionReceipt'
const typeName = 'GetTransactionReceipt'
const TData = 'GetTransactionReceiptData'
const TError = 'GetTransactionReceiptErrorType'
</script>

# useTransactionReceipt

Composable for return the [Transaction Receipt](https://viem.sh/docs/glossary/terms.html#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) hash.

## Import

```ts
import { useTransactionReceipt } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransactionReceipt } from '@wagmi/vue'

const result = useTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseTransactionReceiptParameters } from '@wagmi/vue'
```

### hash

`` `0x${string}` | undefined ``

A transaction hash.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransactionReceipt } from '@wagmi/vue'

const result = useTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The ID of chain to return the transaction receipt from.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransactionReceipt } from '@wagmi/vue'
import { mainnet } from 'wagmi/chains'

const result = useTransactionReceipt({
  chainId: mainnet.id, // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransactionReceipt } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const result = useTransactionReceipt({
  config, // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### scopeKey

`string | undefined`

Scopes the cache to a given context. Composables that have identical context will share the same cache.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useTransactionReceipt } from '@wagmi/vue'
import { config } from './config'

const result = useTransactionReceipt({
  scopeKey: 'foo' // [!code focus]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseTransactionReceiptReturnType } from '@wagmi/vue'
```

<!--@include: @shared/query-result.md-->

<!--@include: @shared/query-imports.md-->

## Action

- [`getTransactionReceipt`](/core/api/actions/getTransactionReceipt)
