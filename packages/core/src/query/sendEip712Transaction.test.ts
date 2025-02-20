import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { sendEip712TransactionMutationOptions } from './sendEip712Transaction.js'

test('default', () => {
  expect(sendEip712TransactionMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "sendEip712Transaction",
      ],
    }
  `)
})
