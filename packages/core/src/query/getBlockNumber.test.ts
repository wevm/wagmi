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
          {
            "chainId": undefined,
          },
        ],
      }
    `)
})

test('parameters: chainId', () => {
  expect(
    getBlockNumberQueryOptions(config, { chainId: testChains.anvil.id }),
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
