# TanStack Query

Wagmi Composables are not only a wrapper around the core [Wagmi Actions](/core/api/actions), but they also utilize [TanStack Query](https://tanstack.com/query/v5) to enable trivial and intuitive fetching, caching, synchronizing, and updating of asynchronous data in your Vue applications.

Without an asynchronous data fetching abstraction, you would need to handle all the negative side-effects that comes as a result, such as: representing finite states (loading, error, success), handling race conditions, caching against a deterministic identifier, etc.

## Queries & Mutations

Wagmi Composables represent either a **Query** or a **Mutation**. 

**Queries** are used for fetching data (e.g. fetching a block number, reading from a contract, etc), and are typically invoked on mount by default. All queries are coupled to a unique [Query Key](#query-keys), and can be used for further operations such as refetching, prefetching, or modifying the cached data.

**Mutations** are used for mutating data (e.g. connecting/disconnecting accounts, writing to a contract, switching chains, etc), and are typically invoked in response to a user interaction. Unlike **Queries**, they are not coupled with a query key.

## Terms

- **Query**: An asynchronous data fetching (e.g. read data) operation that is tied against a unique Query Key.
- **Mutation**: An asynchronous mutating (e.g. create/update/delete data or side-effect) operation.
- **Query Key**: A unique identifier that is used to deterministically identify a query. It is typically a tuple of the query name and the query arguments.
- **Stale Data**: Data that is unused or inactive after a certain period of time.
- **Query Fetching**: The process of invoking an async query function.
- **Query Refetching**: The process of refetching **rendered** queries.
- **[Query Invalidation](https://tanstack.com/query/v5/docs/vue/guides/query-invalidation)**: The process of marking query data as stale (e.g. inactive/unused), and refetching **rendered** queries.
- **[Query Prefetching](https://tanstack.com/query/v5/docs/vue/guides/prefetching)**: The process of prefetching queries and seeding the cache.

<!-- TODO: ## Persistence via External Stores -->

## Query Keys

Query Keys are typically used to perform advanced operations on the query such as: invalidation, refetching, prefetching, etc. 

Wagmi exports Query Keys for every Composable, and they can be retrieved via the [Composable (Vue)](#composable-vue) or via an [Import (Vanilla JS)](#import-vanilla-js).

Read more about **Query Keys** on the [TanStack Query docs.](https://tanstack.com/query/v5/docs/vue/guides/query-keys)

### Composable (Vue)

Each Composable returns a `queryKey` value. You would use this approach when you want to utilize the query key in a Vue component as it handles reactivity for you, unlike the [Import](#import-vanilla-js) method below.

```vue [index.vue]
<script setup lang="ts">
import { useBalance } from '@wagmi/vue' // [!code hl]

const { data: balance } = useBalance() // [!code hl]
</script>

<template>
  <div>{{ balance }}</div>
</template>
```

### Import (Vanilla JS)

Each Hook has a corresponding `get<X>QueryOptions` function that returns a query key. You would use this method when you want to utilize the query key outside of a Vue component in a Vanilla JS context, like in a utility function. 

```ts 
import { getBalanceQueryOptions } from '@wagmi/vue/query' // [!code hl]
import { config } from './config'

function perform() {
  const { queryKey } = getBalanceQueryOptions(config, { // [!code hl]
    chainId: config.state.chainId // [!code hl]
  }) // [!code hl]
}
```

::: warning

The caveat of this method is that it does not handle reactivity for you (e.g. active account/chain changes, argument changes, etc). You would need to handle this yourself by explicitly passing through the arguments to `get<X>QueryOptions`.

:::

## Invalidating Queries

Invalidating a query is the process of marking the query data as stale (e.g. inactive/unused), and refetching the queries that are already rendered.

Read more about **Invalidating Queries** on the [TanStack Query docs.](https://tanstack.com/query/v5/docs/vue/guides/query-invalidation)

#### Example: Watching a Users' Balance

You may want to "watch" a users' balance, and invalidate the balance after each incoming block. We can invoke `invalidateQueries` inside a `watchEffect` – this will refetch all rendered balance queries when the `blockNumber` changes.

```vue
<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query' 
import { useBlockNumber, useBalance } from '@wagmi/vue' 
import { watchEffect } from 'vue' 

const queryClient = useQueryClient()
const { data: blockNumber } = useBlockNumber({ watch: true }) // [!code hl]
const { data: balance, queryKey } = useBalance() // [!code hl]
  
watchEffect(() => { // [!code hl]
  queryClient.invalidateQueries({ queryKey }) // [!code hl]
}) // [!code hl]
</script>

<template>
  <div>Block Number: {{ blockNumber }}</div>
  <div>Balance: {{ balance }}</div>
</template>
```

#### Example: After User Interaction

Maybe you want to invalidate a users' balance after some interaction. This would mark the balance as stale, and consequently refetch all rendered balance queries.

```vue
<script setup lang="ts">
import { useBalance } from '@wagmi/vue'

// 1. Extract `queryKey` from the useBalance Hook. // [!code hl]
const { queryKey } = useBalance() // [!code hl]
</script>

<template>
  // 2. Add a button that invalidates the balance query. // [!code hl]
  <button @click="queryClient.invalidateQueries({ queryKey })"> // [!code hl]
    Invalidate // [!code hl]
  </button> // [!code hl]
</template>
```

```vue
<script setup lang="ts">
// 3. Other `useBalance` Hooks in your rendered Vue tree will be refetched! // [!code hl]
const { data: balance } = useBalance() // [!code hl]
</script>

<template>
  <div>{{ balance }}</div>
</template>
```

## Fetching Queries

Fetching a query is the process of invoking the query function to retrieve data. If the query exists and the data is not invalidated or older than a given `staleTime`, then the data from the cache will be returned. Otherwise, the query will fetch for the latest data.

::: code-group
```tsx [example.tsx]
import { getBlockQueryOptions } from '@wagmi/vue/query'
import { queryClient } from './main'
import { config } from './config'

export async function fetchBlockData() {
  return queryClient.fetchQuery( // [!code hl]
    getBlockQueryOptions(config, { // [!code hl]
      chainId: config.state.chainId, // [!code hl]
    } // [!code hl]
  )) // [!code hl]
}
```
<<< @/snippets/vue/main.ts[main.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

## Retrieving & Updating Query Data

You can retrieve and update query data imperatively with `getQueryData` and `setQueryData`. This is useful for scenarios where you want to retrieve or update a query outside of a Vue component.

Note that these functions do not invalidate or refetch queries.

::: code-group
```tsx [example.tsx]
import type { GetBalanceReturnType } from '@wagmi/vue/actions'
import { getBalanceQueryOptions } from '@wagmi/vue/query'
import { queryClient } from './app'
import { config } from './config'

export function getBalanceData() {
  return queryClient.getQueryData( // [!code hl]
    getBalanceQueryOptions(config, { // [!code hl]
      chainId: config.state.chainId, // [!code hl]
    } // [!code hl]
  )) // [!code hl]
}

export function setBalanceData(parameters: Partial<GetBalanceReturnType>) {
  return queryClient.setQueryData( // [!code hl]
    getBalanceQueryOptions(config, { // [!code hl]
      chainId: config.state.chainId, // [!code hl]
    }, // [!code hl]
    data => ({ ...data, ...parameters }) // [!code hl]
  )) // [!code hl]
}
```
<<< @/snippets/vue/main.ts[main.ts]
<<< @/snippets/vue/config.ts[config.ts]
:::

## Prefetching Queries

Prefetching a query is the process of fetching the data ahead of time and seeding the cache with the returned data. This is useful for scenarios where you want to fetch data before the user navigates to a page, or fetching data on the server to be reused on client hydration.

Read more about **Prefetching Queries** on the [TanStack Query docs.](https://tanstack.com/query/v5/docs/vue/guides/prefetching)

#### Example: Prefetching in Event Handler

```vue
<script setup lang="ts">
import { useConfig, useChainId, useQueryClient } from '@wagmi/vue'
import { getBlockQueryOptions } from '@wagmi/vue/query'

const config = useConfig()
const chainId = useChainId()
const queryClient = useQueryClient()

const prefetch = () => 
  queryClient.prefetchQuery(getBlockQueryOptions(config, { chainId })) 
</script>

<template>
  <a
    @mouseenter="prefetch" 
    @focus="prefetch" 
    href="..."
  >
    Block details
  </a>
</template>
```

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