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

## Persistence via External Stores

By default, TanStack Query persists all query data in-memory. This means that if you refresh the page, all in-memory query data will be lost. 

If you want to persist query data to an external storage, you can utilize TanStack Query's [`createSyncStoragePersister`](https://tanstack.com/query/v5/docs/react/plugins/createSyncStoragePersister) or [`createAsyncStoragePersister`](https://tanstack.com/query/v5/docs/react/plugins/createAsyncStoragePersister) to plug external storage like `localStorage`, `sessionStorage`, [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) or [`AsyncStorage`](https://reactnative.dev/docs/asyncstorage) (React Native).

### Sync Storage

Below is an example of how to set up Wagmi + TanStack Query with sync external storage like `localStorage` or `sessionStorage`.

#### Install

::: code-group
```bash [pnpm]
pnpm i @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```bash [npm]
npm i @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```bash [yarn]
yarn add @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```

```bash [bun]
bun i @tanstack/query-sync-storage-persister @tanstack/react-query-persist-client
```
:::

#### Usage

```tsx
// 1. Import modules. // [!code hl]
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister' // [!code hl]
import { QueryClient } from '@tanstack/react-query' // [!code hl]
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' // [!code hl]
import { WagmiProvider, deserialize, serialize } from 'wagmi' // [!code hl]

// 2. Create a new Query Client with a default `gcTime`. // [!code hl]
const queryClient = new QueryClient({ // [!code hl]
  defaultOptions: { // [!code hl]
    queries: { // [!code hl]
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours // [!code hl]
    }, // [!code hl] 
  }, // [!code hl]
}) // [!code hl]

// 3. Set up the persister. // [!code hl]
const persister = createSyncStoragePersister({ // [!code hl]
  serialize, // [!code hl]
  storage: window.localStorage, // [!code hl]
  deserialize, // [!code hl]
}) // [!code hl]

function App() {
  return (
    <WagmiProvider config={config}>
      {/* 4. Wrap app in PersistQueryClientProvider */} // [!code hl]
      <PersistQueryClientProvider // [!code hl]
        client={queryClient} // [!code hl]
        persistOptions={{ persister }} // [!code hl]
      > // [!code hl]
        {/* ... */}
      </PersistQueryClientProvider> // [!code hl]
    </WagmiProvider>
  )
}
```

Read more about [Sync Storage Persistence](https://tanstack.com/query/v5/docs/react/plugins/createSyncStoragePersister).

### Async Storage

Below is an example of how to set up Wagmi + TanStack Query with async external storage like [`IndexedDB`](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) or [`AsyncStorage`](https://reactnative.dev/docs/asyncstorage).

#### Install

::: code-group
```bash [pnpm]
pnpm i @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```bash [npm]
npm i @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```bash [yarn]
yarn add @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```

```bash [bun]
bun i @tanstack/query-async-storage-persister @tanstack/react-query-persist-client
```
:::

#### Usage

```tsx
// 1. Import modules. // [!code hl]
import AsyncStorage from '@react-native-async-storage/async-storage' // [!code hl]
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister' // [!code hl]
import { QueryClient } from '@tanstack/react-query' // [!code hl]
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' // [!code hl]
import { WagmiProvider, deserialize, serialize } from 'wagmi' // [!code hl]

// 2. Create a new Query Client with a default `gcTime`. // [!code hl]
const queryClient = new QueryClient({ // [!code hl]
  defaultOptions: { // [!code hl]
    queries: { // [!code hl]
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours // [!code hl]
    }, // [!code hl] 
  }, // [!code hl]
}) // [!code hl]

// 3. Set up the persister. // [!code hl]
const persister = createAsyncStoragePersister({ // [!code hl]
  serialize, // [!code hl]
  storage: AsyncStorage, // [!code hl]
  deserialize, // [!code hl]
}) // [!code hl]

function App() {
  return (
    <WagmiProvider config={config}>
      {/* 4. Wrap app in PersistQueryClientProvider */} // [!code hl]
      <PersistQueryClientProvider // [!code hl]
        client={queryClient} // [!code hl]
        persistOptions={{ persister }} // [!code hl]
      > // [!code hl]
        {/* ... */}
      </PersistQueryClientProvider> // [!code hl]
    </WagmiProvider>
  )
}
```

Read more about [Async Storage Persistence](https://tanstack.com/query/v5/docs/react/plugins/createAsyncStoragePersister).

## Query Keys

Query Keys are typically used to perform advanced operations on the query such as: invalidation, refetching, prefetching, etc. 

Wagmi exports Query Keys for every Hook, and they can be retrieved via the [Hook (React)](#hook-react) or via an [Import (Vanilla JS)](#import-vanilla-js).

Read more about **Query Keys** on the [TanStack Query docs.](https://tanstack.com/query/v5/docs/react/guides/query-keys)

### Hook (React)

Each Hook returns a `queryKey` value. You would use this approach when you want to utilize the query key in a React component as it handles reactivity for you, unlike the [Import](#import-vanilla-js) method below.

```ts 
import { useBlock } from 'wagmi' // [!code hl]

function App() {
  const { queryKey } = useBlock() // [!code hl]
}
```

### Import (Vanilla JS)

Each Hook has a corresponding `get<X>QueryOptions` function that returns a query key. You would use this method when you want to utilize the query key outside of a React component in a Vanilla JS context, like in a utility function. 

```ts 
import { getBlockQueryOptions } from 'wagmi' // [!code hl]
import { config } from './config'

function perform() {
  const { queryKey } = getBlockQueryOptions(config, { // [!code hl]
    chainId: config.state.chainId // [!code hl]
  }) // [!code hl]
}
```

::: warning

The caveat of this method is that it does not handle reactivity for you (e.g. active account/chain changes, argument changes, etc). You would need to handle this yourself by explicitly passing through the arguments to `get<X>QueryOptions`.

:::

## Invalidating Queries

Invalidating a query is the process of marking the query data as stale (e.g. inactive/unused), and refetching the queries that are already rendered.

Read more about **Invalidating Queries** on the [TanStack Query docs.](https://tanstack.com/query/v5/docs/react/guides/query-invalidation)

#### Example: Watching a Users' Balance

You may want to "watch" a users' balance, and invalidate the balance after each incoming block. We can invoke `invalidateQueries` inside a `useEffect` with the block number as it's only dependency – this will refetch all rendered balance queries when the `blockNumber` changes.

```tsx
import { useQueryClient } from '@tanstack/react-query' 
import { useEffect } from 'react' 
import { useBlockNumber, useBalance } from 'wagmi' 

function App() {
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true }) // [!code hl]
  const { data: balance, queryKey } = useBalance() // [!code hl]
  
  useEffect(() => { // [!code hl]
    queryClient.invalidateQueries({ queryKey }) // [!code hl]
  }, [blockNumber]) // [!code hl]

  return <div>{balance}</div>
}
```

#### Example: After User Interaction

Maybe you want to invalidate a users' balance after some interaction. This would mark the balance as stale, and consequently refetch all rendered balance queries.

```tsx
import { useBalance } from 'wagmi'

function App() {
  // 1. Extract `queryKey` from the useBalance Hook. // [!code hl]
  const { queryKey } = useBalance() // [!code hl]

  return (
    <button
      onClick={async () => {
        // 2. Invalidate the query when the user clicks "Invalidate". // [!code hl]
        await queryClient.invalidateQueries({ queryKey }) // [!code hl]
      }}
    >
      Invalidate
    </button>
  )
}

function Example() {
  // 3. Other `useBalance` Hooks in your rendered React tree will be refetched! // [!code hl]
  const { data: balance } = useBalance() // [!code hl]

  return <div>{balance}</div>
}
```

## Fetching Queries

Fetching a query is the process of invoking the query function to retrieve data. If the query exists and the data is not invalidated or older than a given `staleTime`, then the data from the cache will be returned. Otherwise, the query will fetch for the latest data.

::: code-group
```tsx [example.tsx]
import { getBlockQueryOptions } from 'wagmi'
import { queryClient } from './app'
import { config } from './config'

export async function fetchBlockData() {
  return queryClient.fetchQuery( // [!code hl]
    getBlockQueryOptions(config, { // [!code hl]
      chainId: config.state.chainId, // [!code hl]
    } // [!code hl]
  )) // [!code hl]
}
```
<<< @/snippets/react/app.tsx[app.tsx]
<<< @/snippets/react/config.ts[config.ts]
:::

## Retrieving & Updating Query Data

You can retrieve and update query data imperatively with `getQueryData` and `setQueryData`. This is useful for scenarios where you want to retrieve or update a query outside of a React component.

Note that these functions do not invalidate or refetch queries.

::: code-group
```tsx [example.tsx]
import { getBlockQueryOptions } from 'wagmi'
import type { Block } from 'viem'
import { queryClient } from './app'
import { config } from './config'

export function getPendingBlockData() {
  return queryClient.getQueryData( // [!code hl]
    getBlockQueryOptions(config, { // [!code hl]
      chainId: config.state.chainId, // [!code hl]
      tag: 'pending' // [!code hl]
    } // [!code hl]
  )) // [!code hl]
}

export function setPendingBlockData(data: Block) {
  return queryClient.setQueryData( // [!code hl]
    getBlockQueryOptions(config, { // [!code hl]
      chainId: config.state.chainId, // [!code hl]
      tag: 'pending' // [!code hl]
    }, // [!code hl]
    data // [!code hl]
  )) // [!code hl]
}
```
<<< @/snippets/react/app.tsx[app.tsx]
<<< @/snippets/react/config.ts[config.ts]
:::

## Prefetching Queries

Prefetching a query is the process of fetching the data ahead of time and seeding the cache with the returned data. This is useful for scenarios where you want to fetch data before the user navigates to a page, or fetching data on the server to be reused on client hydration.

Read more about **Prefetching Queries** on the [TanStack Query docs.](https://tanstack.com/query/v5/docs/react/guides/prefetching)

#### Example: Prefetching in Event Handler

```tsx
import { Link } from 'next/link'
import { getBlockQueryOptions } from 'wagmi'

function App() {
  const config = useConfig()
  const chainId = useChainId()

  // 1. Set up a function to prefetch the block data. // [!code hl]
  const prefetch = () => // [!code hl]
    queryClient.prefetchQuery(getBlockQueryOptions(config, { chainId })) // [!code hl]
  

  return (
    <Link
      // 2. Add event handlers to prefetch the block data // [!code hl] 
      // when user hovers over or focuses on the button. // [!code hl]
      onMouseEnter={prefetch} // [!code hl]
      onFocus={prefetch} // [!code hl]
      to="/block-details"
    >
      Block details
    </Link>
  )
}
```

## SSR

It is possible to utilize TanStack Query's SSR strategies with Wagmi Hooks & Query Keys. Check out the [Server Rendering & Hydration](https://tanstack.com/query/v5/docs/react/guides/ssr) & [Advanced Server Rendering](https://tanstack.com/query/v5/docs/react/guides/advanced-ssr) guides.

## Devtools

TanStack Query includes dedicated [Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) that assist in visualizing and debugging your queries, their cache states, and much more. You will have to pass a custom `queryKeyFn` to your `QueryClient` for Devtools to correctly serialize BigInt values for display. Alternatively, You can use the `hashFn` from `@wagmi/core/query`, which already handles this serialization.

#### Install

::: code-group
```bash [pnpm]
pnpm i @tanstack/react-query-devtools
```

```bash [npm]
npm i @tanstack/react-query-devtools
```

```bash [yarn]
yarn add @tanstack/react-query-devtools
```

```bash [bun]
bun i @tanstack/react-query-devtools
```
:::

#### Usage

```tsx
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // [!code hl]
import { hashFn } from "@wagmi/core/query"; // [!code hl]

const queryClient = new QueryClient({
  defaultOptions: { // [!code hl]
    queries: { // [!code hl]
      queryKeyHashFn: hashFn, // [!code hl]
    }, // [!code hl]
  }, // [!code hl]
});
```
