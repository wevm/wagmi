import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionReceiptQueryOptions } from './getTransactionReceipt.js'

test('default', () => {
  expect(
    getTransactionReceiptQueryOptions(config, {
      hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getTransactionReceipt",
        {
          "hash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getTransactionReceiptQueryOptions(config, {
      chainId: chain.mainnet2.id,
      hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getTransactionReceipt",
        {
          "chainId": 456,
          "hash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        },
      ],
    }
  `)
})
