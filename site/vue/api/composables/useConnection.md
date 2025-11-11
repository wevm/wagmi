---
title: useConnection
description: Composable for getting current connection.
---

# useConnection

Composable for getting current connection.

## Import

```ts
import { useConnection } from '@wagmi/vue'
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
import { useConnection } from '@wagmi/vue'

const connection = useConnection()
</script>

<template>
  Address: {{ connection.address }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts twoslash
import { type UseConnectionParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnection } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const connection = useConnection({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts twoslash
import { type UseConnectionReturnType } from '@wagmi/vue'
```

<!--@include: @shared/getConnection-return-type.md-->

## Action

- [`getConnection`](/core/api/actions/getConnection)
