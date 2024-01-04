---
title: useInfiniteReadContracts
description: Hook for calling multiple read methods on a contract with "infinite scroll"/"fetch more" support.
---

<script setup>
const packageName = 'wagmi'
const includeInfiniteQueryOptions = true
const TPageParam = 'number'
const TData = 'InfiniteReadContractsData'
const TError = 'ReadContractsErrorType'
</script>

# useInfiniteReadContracts

Hook for calling multiple contract read-only methods with "infinite scrolling"/"fetch more" support. 

## Import

```ts
import { useInfiniteReadContracts } from 'wagmi'
```

## Usage

The example below shows how to demonstrate how to fetch a set of [mloot](https://etherscan.io/address/0x1dfe7ca09e99d10835bf73044a23b73fc20623df) attributes (chestwear, footwear, and handwear) with "fetch more" support.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

const mlootContractConfig = {
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi,
} as const

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      const args = [pageParam] as const
      return [
        { ...mlootContractConfig, functionName: 'getChest', args },
        { ...mlootContractConfig, functionName: 'getFoot', args },
        { ...mlootContractConfig, functionName: 'getHand', args },
      ]
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

In the above example, we are setting a few things:

- [`cacheKey`](#cachekey): A unique key to store the data in the cache.
- [`query.initialPageParam`](#initialpageparam): An initial page parameter to use when fetching the first set of contracts.
- [`query.getNextPageParam`](#getnextpageparam): A function that returns the next page parameter to use when fetching the next set of contracts.
- [`contracts`](#contracts): A function that provides `pageParam` (derived from the above) as an argument and expects to return an array of contracts.

### Paginated Parameters

We can also leverage properties like `getNextPageParam` with a custom `limit` variable to achieve "pagination" of parameters. For example, we can fetch the first 10 contract functions, then fetch the next 10 contract functions, and so on.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function Example({ limit = 10 }: { limit?: number } = {}) {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      return [...new Array(limit)].map(
        (_, i) =>
          ({
            address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
            abi,
            functionName: 'getHand',
            args: [BigInt(pageParam + i)],
          }) as const,
      )
    },
    query: {
      initialPageParam: 1,
      getNextPageParam(_lastPage, _allPages, lastPageParam) {
        return lastPageParam + limit
      },
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::


## Parameters

```ts
import { type UseInfiniteReadContractsParameters } from 'wagmi'
```

### cacheKey

`string`

A unique key to store the data in the cache.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes', // [!code hl]
    contracts(pageParam) {
      // ...
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

### contracts

`(pageParam: {{TPageParam}}) => Contract[]`

A function that provides `pageParam` (derived from the above) as an argument and expects to return an array of contracts.

#### abi

`Abi | undefined`

The contract's ABI. Check out the [TypeScript docs](/react/typescript#const-assert-abis-typed-data) for how to set up ABIs for maximum type inference and safety.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      const args = [pageParam] as const
      return [
        // ...
        {  
          address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
          abi, // [!code hl]
          functionName: 'getChest', 
          args 
        },
        // ...
      ]
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

#### address

`Address | undefined`

The contract's address.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      const args = [pageParam] as const
      return [
        // ...
        {  
          address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df', // [!code hl]
          abi,
          functionName: 'getChest', 
          args 
        },
        // ...
      ]
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

#### functionName

`string | undefined`

- Function to call on the contract.
- Inferred from [`abi`](#abi).

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      const args = [pageParam] as const
      return [
        // ...
        {  
          address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
          abi,
          functionName: 'getChest', // [!code hl]
          args 
        },
        // ...
      ]
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

#### args

`readonly unknown[] | undefined`

- Arguments to pass when calling the contract.
- Inferred from [`abi`](#abi) and [`functionName`](#functionname).

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      return [
        // ...
        {  
          address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
          abi,
          functionName: 'getChest', 
          args: [pageParam] // [!code hl]
        },
        // ...
      ]
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

#### chainId

`config['chains'][number]['id'] | undefined`

ID of chain to use when fetching data.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from 'wagmi'
import { abi } from './abi'

function App() {
  const result = useInfiniteReadContracts({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      const args = [pageParam] as const
      return [
        // ...
        {  
          address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
          abi,
          functionName: 'getChest', 
          args,
          chainId: 1 // [!code hl]
        },
        // ...
      ]
    }
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      }
    }
  })
}
```
<<< @/snippets/abi-infinite-read.ts[abi.ts]
<<< @/snippets/react/config.ts[config.ts]
:::

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { type UseInfiniteReadContractsReturnType } from 'wagmi'
```

<!--@include: @shared/query-result.md-->