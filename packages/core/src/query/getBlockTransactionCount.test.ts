import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlockTransactionCountQueryOptions } from './getBlockTransactionCount.js'

test('default', () => {
  expect(getBlockTransactionCountQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "blockTransactionCount",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBlockTransactionCountQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
      {
        "queryFn": [Function],
        "queryKey": [
          "blockTransactionCount",
          {
            "chainId": 1,
          },
        ],
      }
    `)
})

test('parameters: blockTag', () => {
  expect(
    getBlockTransactionCountQueryOptions(config, {
      blockTag: 'earliest',
    }),
  ).toMatchInlineSnapshot(`
      {
        "queryFn": [Function],
        "queryKey": [
          "blockTransactionCount",
          {
            "blockTag": "earliest",
          },
        ],
      }
    `)
})
