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

test('parameters: index 0 with blockNumber enables query', () => {
  const options = getTransactionQueryOptions(config, {
    blockNumber: 1n,
    index: 0,
  })
  expect(options.enabled).toBe(true)
})
