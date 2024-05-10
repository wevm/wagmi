---
title: useAccount
description: Composable for getting current account.
---

# useAccount

Composable for getting current account.

## Import

```ts
import { useAccount } from '@wagmi/vue'
```

## Usage

::: code-group
```vue twoslash [index.vue]
<script setup lang="ts">
import { useAccount } from '@wagmi/vue'

const account = useAccount()
</script>

<template>
  Address: {{ account.address }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type UseAccountParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/react/api/createConfig#config) to use instead of retrieving from the from nearest [`WagmiProvider`](/react/api/WagmiProvider).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useAccount } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const account = useAccount({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Return Type

```ts
import { type UseAccountReturnType } from '@wagmi/vue'
```

<!--@include: @shared/getAccount-return-type.md-->

## Action

- [`getAccount`](/core/api/actions/getAccount)
