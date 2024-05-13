# Error Handling

The `error` property in Wagmi Composables is strongly typed with it's corresponding error type. This enables you to have granular precision with handling errors in your application.

You can discriminate the error type by using the `name` property on the error object.

::: code-group
```vue twoslash [index.vue]
<script setup lang="ts">
// @noErrors
import { useBlockNumber } from 'wagmi'

const { data, error } = useBlockNumber()
//            ^?


error?.name
//     ^?





</script>

<template>
  <div v-if="error?.name === 'HttpRequestError'">
    A HTTP error occurred. Status: {{ error.status }}
//                                          ^?
  </div>

  <div v-else-if="error?.name === 'LimitExceededRpcError'">
    Rate limit exceeded. Code: {{ error.code }}
//                                      ^?
  </div>
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::
