---
title: useBlockNumber
description: Primitive for fetching the current block number.
---

# useBlockNumber

Primitive for fetching the current block number.

## Import

```ts
import { useBlockNumber } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBlockNumber } from '@wagmi/solid'

function App() {
  const blockNumber = useBlockNumber()
}
```
```ts [config.ts]
import { http, createConfig } from '@wagmi/solid'
import { mainnet, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
:::

## Parameters

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useBlockNumber(() => ({
  chainId: 1,
  // other parameters...
}))
```

### cacheTime

`number | undefined`

Time in milliseconds that cached block number will remain in memory.

### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

### scopeKey

`string | undefined`

Scopes the cache to a given context. Primitives that have identical context will share the same cache.

### query

TanStack Query parameters. See the [TanStack Query query docs](https://tanstack.com/query/v5/docs/framework/solid/reference/createQuery) for more info.

## Return Type

```ts
import { type CreateQueryResult } from '@tanstack/solid-query'
```

### data

`bigint | undefined`

The current block number.

### error

`GetBlockNumberErrorType | null`

The error object if the query failed.

### isError / isPending / isSuccess

`boolean`

Boolean flags indicating the query status.

## Action

- [`getBlockNumber`](/core/api/actions/getBlockNumber)
