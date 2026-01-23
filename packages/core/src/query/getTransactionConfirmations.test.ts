import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionConfirmationsQueryOptions } from './getTransactionConfirmations.js'

test('default', () => {
  expect(
    getTransactionConfirmationsQueryOptions(config, {
      hash: '0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "transactionConfirmations",
        {
          "hash": "0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getTransactionConfirmationsQueryOptions(config, {
      chainId: chain.mainnet.id,
      hash: '0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "transactionConfirmations",
        {
          "chainId": 1,
          "hash": "0xa559259bd2d0e8372421e222ff3545f705b5da60005bd787a23c2e68d6d7fefd",
        },
      ],
    }
  `)
})
