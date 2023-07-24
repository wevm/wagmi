import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionQueryOptions } from './getTransaction.js'

test('default', () => {
  expect(getTransactionQueryOptions(config)).toMatchInlineSnapshot(`
    {
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
    getTransactionQueryOptions(config, { chainId: testChains.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "transaction",
        {
          "chainId": 123,
        },
      ],
    }
  `)
})
