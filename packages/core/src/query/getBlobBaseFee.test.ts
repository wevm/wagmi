import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlobBaseFeeQueryOptions } from './getBlobBaseFee.js'

test('default', () => {
  expect(getBlobBaseFeeQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getBlobBaseFee",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBlobBaseFeeQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getBlobBaseFee",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
