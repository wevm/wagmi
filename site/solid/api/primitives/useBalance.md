---
title: useBalance
description: Primitive for fetching native currency balance.
---

<script setup>
const packageName = '@wagmi/solid'
const actionName = 'getBalance'
const typeName = 'GetBalance'
const TData = '{ decimals: number; symbol: string; value: bigint; }'
const TError = 'GetBalanceErrorType'
</script>

# useBalance

Primitive for fetching native currency balance.

## Import

```ts
import { useBalance } from '@wagmi/solid'
```

## Usage

::: code-group
```tsx [index.tsx]
import { useBalance } from '@wagmi/solid'

function App() {
  const balance = useBalance(() => ({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
  }))
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
useBalance(() => ({
  address: '0x...',
  // other parameters...
}))
```

### address

`Address | undefined`

Address to get balance for. [`enabled`](#enabled) set to `false` if `address` is `undefined`.

### blockNumber

`bigint | undefined`

Block number to get balance at.

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

Block tag to get balance at.

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

Returns a TanStack Query result object with the following properties:

### data

`{ decimals: number; symbol: string; value: bigint; } | undefined`

The balance data, including:
- `decimals`: Number of decimals for the token
- `symbol`: Token symbol
- `value`: Raw balance value as bigint

### error

`GetBalanceErrorType | null`

The error object if the query failed.

### isError / isPending / isSuccess

`boolean`

Boolean flags indicating the query status.

### refetch

`() => Promise<...>`

Function to manually refetch the data.

## Action

- [`getBalance`](/core/api/actions/getBalance)
