import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlockQueryOptions } from './getBlock.js'

test('default', () => {
  expect(getBlockQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "block",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBlockQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "block",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
