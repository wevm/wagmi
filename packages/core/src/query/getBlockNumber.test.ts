import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlockNumberQueryOptions } from './getBlockNumber.js'

test('default', () => {
  expect(getBlockNumberQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "blockNumber",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBlockNumberQueryOptions(config, { chainId: testChains.mainnet.id }),
  ).toMatchInlineSnapshot(`
      {
        "gcTime": 0,
        "queryFn": [Function],
        "queryKey": [
          "blockNumber",
          {
            "chainId": 123,
          },
        ],
      }
    `)
})
