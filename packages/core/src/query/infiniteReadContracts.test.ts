import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { infiniteReadContractsQueryOptions } from './infiniteReadContracts.js'

test('default', () => {
  expect(
    infiniteReadContractsQueryOptions(config, {
      allowFailure: true,
      batchSize: 1024,
      blockNumber: 123n,
      blockTag: 'latest',
      cacheKey: 'foo',
      chainId: 1,
      multicallAddress: '0x',
      scopeKey: 'bar',
      contracts(_pageParam) {
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
        getNextPageParam(_lastPage, _allPages, lastPageParam, _allPageParams) {
          return lastPageParam + 1
        },
      },
    }),
  ).toMatchInlineSnapshot(`
    {
      "getNextPageParam": [Function],
      "initialPageParam": 0,
      "queryFn": [Function],
      "queryKey": [
        "infiniteReadContracts",
        {
          "allowFailure": true,
          "batchSize": 1024,
          "blockNumber": 123n,
          "blockTag": "latest",
          "cacheKey": "foo",
          "chainId": 1,
          "multicallAddress": "0x",
          "scopeKey": "bar",
        },
      ],
    }
  `)
})
