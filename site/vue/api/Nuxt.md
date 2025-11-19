# Nuxt

[Nuxt Module](https://nuxt.com/docs/guide/concepts/modules) for Wagmi. Adds all [Composables](/vue/api/composables) as [auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports).

## Usage

::: code-group
```ts twoslash [nuxt.config.ts]
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@wagmi/vue/nuxt'],
})
```
```vue [index.vue]
<script setup lang="ts">
// No need to import `useConnection`! // [!code focus]
const connection = useConnection() // [!code focus]
</script>

<template>
  Address: {{ connection.address }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

