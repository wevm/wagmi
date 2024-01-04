import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useInfiniteReadContracts } from './useInfiniteReadContracts.js'

test('select data', async () => {
  const result = useInfiniteReadContracts({
    allowFailure: false,
    cacheKey: 'foo',
    contracts(pageParam) {
      expectTypeOf(pageParam).toEqualTypeOf<string>()
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
      initialPageParam: '0',
      getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
        expectTypeOf(lastPage).toEqualTypeOf<[bigint, string]>()
        expectTypeOf(allPages).toEqualTypeOf<[bigint, string][]>()
        expectTypeOf(lastPageParam).toEqualTypeOf<string>()
        expectTypeOf(allPageParams).toEqualTypeOf<string[]>()
        return lastPageParam + 1
      },
      select(data) {
        expectTypeOf(data.pageParams[0]!).toEqualTypeOf<string>()
        expectTypeOf(data.pages[0]!).toEqualTypeOf<[bigint, string]>()
        return data.pages[0]?.[0]!
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})
