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
// No need to import `useAccount`! // [!code focus]
const account = useAccount() // [!code focus]
</script>

<template>
  Address: {{ account.address }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

