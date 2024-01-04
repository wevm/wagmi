import { abi, config } from '@wagmi/test'
import { type MulticallResponse } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { infiniteReadContractsQueryOptions } from './infiniteReadContracts.js'

test('default', async () => {
  const options = infiniteReadContractsQueryOptions(config, {
    cacheKey: 'foo',
    contracts(pageParam) {
      expectTypeOf(pageParam).toEqualTypeOf(options.initialPageParam)
      return [
        {
          address: '0x',
          abi: abi.erc20,
          functionName: 'balanceOf',
          args: ['0x'],
        },
        {
          address: '0x',
          abi: abi.wagmiMintExample,
          functionName: 'tokenURI',
          args: [123n],
        },
      ]
    },
    query: {
      initialPageParam: 0,
      getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
        expectTypeOf(lastPage).toEqualTypeOf<
          [MulticallResponse<bigint>, MulticallResponse<string>]
        >()
        expectTypeOf(allPages).toEqualTypeOf<
          [MulticallResponse<bigint>, MulticallResponse<string>][]
        >()
        expectTypeOf(lastPageParam).toEqualTypeOf(options.initialPageParam)
        expectTypeOf(allPageParams).toEqualTypeOf([options.initialPageParam])
        return lastPageParam + 1
      },
    },
  })
  const result = await options.queryFn({} as any)
  expectTypeOf(result).toEqualTypeOf<
    [MulticallResponse<bigint>, MulticallResponse<string>]
  >()
})

test('allowFailure: false', async () => {
  const options = infiniteReadContractsQueryOptions(config, {
    allowFailure: false,
    cacheKey: 'foo',
    contracts(pageParam) {
      expectTypeOf(pageParam).toEqualTypeOf(options.initialPageParam)
      return [
        {
          address: '0x',
          abi: abi.erc20,
          functionName: 'balanceOf',
          args: ['0x'],
        },
        {
          address: '0x',
          abi: abi.wagmiMintExample,
          functionName: 'tokenURI',
          args: [123n],
        },
      ]
    },
    query: {
      initialPageParam: 0,
      getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
        expectTypeOf(lastPage).toEqualTypeOf<[bigint, string]>()
        expectTypeOf(allPages).toEqualTypeOf<[bigint, string][]>()
        expectTypeOf(lastPageParam).toEqualTypeOf(options.initialPageParam)
        expectTypeOf(allPageParams).toEqualTypeOf([options.initialPageParam])
        return lastPageParam + 1
      },
    },
  })
  const result = await options.queryFn({} as any)
  expectTypeOf(result).toEqualTypeOf<[bigint, string]>()
})

test('initialPageParam', async () => {
  const options = infiniteReadContractsQueryOptions(config, {
    allowFailure: false,
    cacheKey: 'foo',
    contracts(pageParam) {
      expectTypeOf(pageParam).toEqualTypeOf(options.initialPageParam)
      return [
        {
          address: '0x',
          abi: abi.erc20,
          functionName: 'balanceOf',
          args: ['0x'],
        },
        {
          address: '0x',
          abi: abi.wagmiMintExample,
          functionName: 'tokenURI',
          args: [123n],
        },
      ]
    },
    query: {
      initialPageParam: 'bar',
      getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
        expectTypeOf(lastPage).toEqualTypeOf<[bigint, string]>()
        expectTypeOf(allPages).toEqualTypeOf<[bigint, string][]>()
        expectTypeOf(lastPageParam).toEqualTypeOf(options.initialPageParam)
        expectTypeOf(allPageParams).toEqualTypeOf([options.initialPageParam])
        return lastPageParam + 1
      },
    },
  })
  const result = await options.queryFn({} as any)
  expectTypeOf(result).toEqualTypeOf<[bigint, string]>()
})

test('behavior: `contracts` after `getNextPageParam`', async () => {
  const options = infiniteReadContractsQueryOptions(config, {
    allowFailure: false,
    cacheKey: 'foo',
    query: {
      initialPageParam: 0,
      getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
        expectTypeOf(lastPage).toEqualTypeOf<unknown[]>()
        expectTypeOf(allPages).toEqualTypeOf<unknown[][]>()
        expectTypeOf(lastPageParam).toEqualTypeOf(options.initialPageParam)
        expectTypeOf(allPageParams).toEqualTypeOf([options.initialPageParam])
        return lastPageParam + 1
      },
    },
    contracts(pageParam) {
      expectTypeOf(pageParam).toEqualTypeOf(options.initialPageParam)
      return [
        {
          address: '0x',
          abi: abi.erc20,
          functionName: 'balanceOf',
          args: ['0x'],
        },
        {
          address: '0x',
          abi: abi.wagmiMintExample,
          functionName: 'tokenURI',
          args: [123n],
        },
      ]
    },
  })
  const result = await options.queryFn({} as any)
  expectTypeOf(result).toEqualTypeOf<unknown[]>()
})

test('overloads', async () => {
  const options = infiniteReadContractsQueryOptions(config, {
    allowFailure: false,
    cacheKey: 'foo',
    contracts(pageParam) {
      expectTypeOf(pageParam).toEqualTypeOf<number>()
      return [
        {
          address: '0x',
          abi: abi.viewOverloads,
          functionName: 'foo',
        },
        {
          address: '0x',
          abi: abi.viewOverloads,
          functionName: 'foo',
          args: ['0x'],
        },
        {
          address: '0x',
          abi: abi.viewOverloads,
          functionName: 'foo',
          args: ['0x', '0x'],
        },
      ]
    },
    query: {
      initialPageParam: 0,
      getNextPageParam(_, allPages) {
        return allPages.length + 1
      },
    },
  })

  const result = await options.queryFn({} as any)
  expectTypeOf(result).toEqualTypeOf<
    [
      number,
      string,
      {
        foo: `0x${string}`
        bar: `0x${string}`
      },
    ]
  >()
})
