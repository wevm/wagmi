# TanStack Query

Wagmi Hooks are not only a wrapper around the core [Wagmi Actions](/core/api/actions), but they also utilize [TanStack Query](https://tanstack.com/query/v5) to enable trivial and intuitive fetching, caching, synchronizing, and updating of asynchronous data in your React applications.

Without an asynchronous data fetching abstraction, you would need to handle all the negative side-effects that comes as a result, such as: representing finite states (loading, error, success), handling race conditions, caching against a deterministic identifier, etc.

## Queries & Mutations

Wagmi Hooks represent either a **Query** or a **Mutation**. 

**Queries** are used for fetching data (e.g. fetching a block number, reading from a contract, etc), and are typically invoked on mount by default. All queries are coupled to a unique [Query Key](#query-keys), and can be used for further operations such as refetching, prefetching, or modifying the cached data.

**Mutations** are used for mutating data (e.g. connecting/disconnecting accounts, writing to a contract, switching chains, etc), and are typically invoked in response to a user interaction. Unlike **Queries**, they are not coupled with a query key.

## Terms

- **Query**: An asynchronous data fetching (e.g. read data) operation that is tied against a unique Query Key.
- **Mutation**: An asynchronous mutating (e.g. create/update/delete data or side-effect) operation.
- **Query Key**: A unique identifier that is used to deterministically identify a query. It is typically a tuple of the query name and the query arguments.
- **Stale Data**: Data that is unused or inactive after a certain period of time.
- **Query Fetching**: The process of invoking an async query function.
- **Query Refetching**: The process of refetching **rendered** queries.
- **[Query Invalidation](https://tanstack.com/query/v5/docs/react/guides/query-invalidation)**: The process of marking query data as stale (e.g. inactive/unused), and refetching **rendered** queries.
- **[Query Prefetching](https://tanstack.com/query/v5/docs/react/guides/prefetching)**: The process of prefetching queries and seeding the cache.

<!-- TODO: ## Persistence via External Stores -->

<!-- TODO: ## Query Keys -->

<!-- TODO: ## Invalidating Queries -->

<!-- TODO: ## Fetching Queries -->

<!-- TODO: ## Retrieving & Updating Query Data -->

<!-- TODO: ## Prefetching Queries -->

## SSR

It is possible to utilize TanStack Query's SSR strategies with Wagmi Composables & Query Keys. Check out the [SSR guide](https://tanstack.com/query/latest/docs/framework/vue/guides/ssr).

## Devtools

TanStack Query includes dedicated [Devtools](https://tanstack.com/query/latest/docs/framework/vue/devtools) that assist in visualizing and debugging your queries, their cache states, and much more. You will have to pass a custom `queryKeyFn` to your `QueryClient` for Devtools to correctly serialize BigInt values for display. Alternatively, You can use the `hashFn` from `@wagmi/core/query`, which already handles this serialization.

#### Install

::: code-group
```bash [pnpm]
pnpm i @tanstack/vue-query-devtools
```

```bash [npm]
npm i @tanstack/vue-query-devtools
```

```bash [yarn]
yarn add @tanstack/vue-query-devtools
```

```bash [bun]
bun i @tanstack/vue-query-devtools
```
:::

#### Usage

::: code-group
```vue [App.vue]
<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <VueQueryDevtools />
</template>
```

```vue [main.vue]
<script setup lang="ts">
import { createApp } from 'vue'
import { WagmiPlugin } from '@wagmi/vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import { config } from './config' 

const queryClient = new QueryClient({ // [!code hl]
  defaultOptions: { // [!code hl]
    queries: { // [!code hl]
      queryKeyHashFn: hashFn, // [!code hl]
    }, // [!code hl]
  }, // [!code hl]
}); // [!code hl]

createApp(App)
  .use(WagmiPlugin, { config })
  .use(VueQueryPlugin, { queryClient }) // [!code hl]
  .mount('#app')
</script>
```
:::