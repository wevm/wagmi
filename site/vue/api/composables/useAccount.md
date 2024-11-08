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
// ---cut-start---
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

declare module '@wagmi/vue' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut-end---
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

```ts twoslash
import { type UseAccountParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiPlugin`](/vue/api/WagmiPlugin).

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
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts twoslash
import { type UseAccountReturnType } from '@wagmi/vue'
```

<!--@include: @shared/getAccount-return-type.md-->

## Action

- [`getAccount`](/core/api/actions/getAccount)
