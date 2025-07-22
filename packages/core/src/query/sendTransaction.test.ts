import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { sendTransactionMutationOptions } from './sendTransaction.js'

test('default', () => {
  expect(sendTransactionMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "sendTransaction",
      ],
    }
  `)
})
