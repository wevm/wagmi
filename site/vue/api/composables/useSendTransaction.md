---
title: useSendTransaction
description: Composable for creating, signing, and sending transactions to networks.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'sendTransaction'
const typeName = 'SendTransaction'
const mutate = 'sendTransaction'
const TData = 'SendTransactionData'
const TError = 'SendTransactionErrorType'
const TVariables = 'SendTransactionVariables'
</script>

# useSendTransaction

Composable for creating, signing, and sending transactions to networks.

## Import

```ts
import { useSendTransaction } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSendTransaction } from '@wagmi/vue'
import { parseEther } from 'viem'

const sendTransaction = useSendTransaction()
</script>

<template>
  <button
    @click="sendTransaction.mutate({
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01')
    })"
  >
    Send transaction
  </button>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSendTransactionParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSendTransaction } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const sendTransaction = useSendTransaction({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSendTransactionReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`sendTransaction`](/core/api/actions/sendTransaction)
