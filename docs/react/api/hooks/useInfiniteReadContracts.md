---
title: useInfiniteReadContracts
description: Hook for calling multiple read methods on a contract with "infinite scroll"/"fetch more" support.
---

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

- [`cacheKey`](#TODO): A unique key to store the data in the cache.
- [`query.initialPageParam`](#TODO): An initial page parameter to use when fetching the first set of contracts.
- [`query.getNextPageParam`](#TODO): A function that returns the next page parameter to use when fetching the next set of contracts.
- [`contracts`](#TODO): A function that provides `pageParam` (derived from the above) as an argument and expects to return an array of contracts.


## Parameters

```ts
import { type UseInfiniteReadContractsParameters } from 'wagmi'
```

## Return Type

```ts
import { type UseInfiniteReadContractsReturnType } from 'wagmi'
```
