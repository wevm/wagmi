import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionQueryOptions } from './getTransaction.js'

test('default', () => {
  expect(getTransactionQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "transaction",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getTransactionQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "transaction",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
