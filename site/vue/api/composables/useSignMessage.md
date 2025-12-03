---
title: useSignMessage
description: Composable for signing messages.
---

<script setup>
const packageName = '@wagmi/vue'
const actionName = 'signMessage'
const typeName = 'SignMessage'
const mutate = 'signMessage'
const TData = 'SignMessageData'
const TError = 'SignMessageErrorType'
const TVariables = 'SignMessageVariables'
</script>

# useSignMessage

Composable for signing messages.

## Import

```ts
import { useSignMessage } from '@wagmi/vue'
```

## Usage

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSignMessage } from '@wagmi/vue'

const signMessage = useSignMessage()
</script>

<template>
  <button @click="signMessage.mutate({ message: 'hello world' })">
    Sign message
  </button>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseSignMessageParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useSignMessage } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const signMessage = useSignMessage({
  config // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

<!--@include: @shared/mutation-options.md-->

## Return Type

```ts
import { type UseSignMessageReturnType } from '@wagmi/vue'
```

<!--@include: @shared/mutation-result.md-->

<!--@include: @shared/mutation-imports.md-->

## Action

- [`signMessage`](/core/api/actions/signMessage)
