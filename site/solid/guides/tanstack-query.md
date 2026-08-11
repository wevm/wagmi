# TanStack Query

[TanStack Query](https://tanstack.com/query/latest) is a powerful asynchronous state management library for Solid. It provides features like caching, deduplication, background refetching, and more.

## Overview

`@wagmi/solid` uses TanStack Query under the hood to handle data fetching, caching, and state management. This means you get all the benefits of TanStack Query while using Wagmi primitives.

## Setup

To use `@wagmi/solid`, you need to wrap your app with both `WagmiProvider` and `QueryClientProvider`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* Your app */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

## Query States

When using Wagmi query primitives like `useBalance` or `useBlockNumber`, you have access to TanStack Query's state properties:

```tsx
import { useBalance } from '@wagmi/solid'

function Balance() {
  const balance = useBalance(() => ({
    address: '0x...',
  }))

  return (
    <div>
      {balance.isPending && <p>Loading...</p>}
      {balance.isError && <p>Error: {balance.error?.message}</p>}
      {balance.isSuccess && <p>Balance: {balance.data?.formatted}</p>}
    </div>
  )
}
```

## Query Options

Wagmi primitives accept TanStack Query options through the `query` parameter:

```tsx
import { useBalance } from '@wagmi/solid'

function Balance() {
  const balance = useBalance(() => ({
    address: '0x...',
    query: {
      enabled: true,
      refetchInterval: 5000, // Refetch every 5 seconds
      staleTime: 1000, // Consider data stale after 1 second
    },
  }))

  // ...
}
```

## Further Reading

For more information about TanStack Query, check out:

- [TanStack Query Solid Documentation](https://tanstack.com/query/latest/docs/framework/solid/overview)
- [Query Basics](https://tanstack.com/query/latest/docs/framework/solid/guides/queries)
- [Mutations](https://tanstack.com/query/latest/docs/framework/solid/guides/mutations)
