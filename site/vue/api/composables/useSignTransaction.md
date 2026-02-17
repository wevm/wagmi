---
title: useSignTransaction
description: Composable for creating, and signing transactions to networks.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'signTransaction'
const typeName = 'SignTransaction'
const mutate = 'signTransaction'
const TData = 'SignTransactionData'
const TError = 'SignTransactionErrorType'
const TVariables = 'SignTransactionVariables'
</script>

# useSignTransaction

Composable for signing transactions.

## Import

```ts
import { useSignTransaction } from '@wagmi/vue'
```

## Usage

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { useSignTransaction } from '@wagmi/vue'
import { parseEther } from 'viem'

const signTransaction = useSignTransaction()
</script>

<template>
  <button
    @click="signTransaction.mutate({
      to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      value: parseEther('0.01')
    })"
  >
    Sign transaction
  </button>
</template>
```

<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignTransactionParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group

```vue [index.vue]
<script setup lang="ts">
import { useSignTransaction } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const signTransaction = useSignTransaction({
  config, // [!code focus]
})
</script>
```

<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignTransactionReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`signTransaction`](/core/api/actions/signTransaction)
