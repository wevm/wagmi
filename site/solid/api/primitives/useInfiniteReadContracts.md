---
title: useInfiniteReadContracts
description: Primitive for calling multiple read methods on a contract with "infinite scroll"/"fetch more" support.
---

<script setup>
const packageName = '@wagmi/solid'
const includeInfiniteQueryOptions = true
const TPageParam = 'number'
const TData = 'InfiniteReadContractsData'
const TError = 'ReadContractsErrorType'
</script>

# useInfiniteReadContracts

Primitive for calling multiple contract read-only methods with "infinite scrolling"/"fetch more" support.

## Import

```ts
import { useInfiniteReadContracts } from '@wagmi/solid'
```

## Usage

The example below shows how to fetch a set of [mloot](https://etherscan.io/address/0x1dfe7ca09e99d10835bf73044a23b73fc20623df) attributes (chestwear, footwear, and handwear) with "fetch more" support.

::: code-group
```tsx [index.tsx]
import { useInfiniteReadContracts } from '@wagmi/solid'
import { abi } from './abi'

const mlootContractConfig = {
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi,
} as const

function App() {
  const result = useInfiniteReadContracts(() => ({
    cacheKey: 'mlootAttributes',
    contracts(pageParam) {
      const args = [pageParam] as const
      return [
        { ...mlootContractConfig, functionName: 'getChest', args },
        { ...mlootContractConfig, functionName: 'getFoot', args },
        { ...mlootContractConfig, functionName: 'getHand', args },
      ]
    },
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1
      },
    },
  }))
}
```
<<< @/snippets/solid/config.ts[config.ts]
:::

In the above example, we are setting a few things:

- [`cacheKey`](#cachekey): A unique key to store the data in the cache.
- [`query.initialPageParam`](#initialpageparam): An initial page parameter to use when fetching the first set of contracts.
- [`query.getNextPageParam`](#getnextpageparam): A function that returns the next page parameter to use when fetching the next set of contracts.
- [`contracts`](#contracts): A function that provides `pageParam` (derived from the above) as an argument and expects to return an array of contracts.

## Parameters

```ts
import { useInfiniteReadContracts } from '@wagmi/solid'

useInfiniteReadContracts.Parameters
useInfiniteReadContracts.SolidParameters
```

Parameters are passed as a getter function to maintain Solid reactivity.

```ts
useInfiniteReadContracts(() => ({
  cacheKey: 'mlootAttributes',
  contracts(pageParam) { ... },
  query: { ... },
}))
```

### cacheKey

`string`

A unique key to store the data in the cache.

### contracts

`(pageParam: TPageParam) => Contract[]`

A function that provides `pageParam` (derived from the above) as an argument and expects to return an array of contracts. Each contract includes `abi`, `address`, `functionName`, `args`, and optional `chainId`.

### config

`Config | undefined`

[`Config`](/solid/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiProvider`](/solid/api/WagmiProvider).

<!--@include: @shared/query-options.md-->

## Return Type

```ts
import { useInfiniteReadContracts } from '@wagmi/solid'

useInfiniteReadContracts.ReturnType
```

<!--@include: @shared/query-result.md-->

## Action

- [`readContracts`](/core/api/actions/readContracts)
