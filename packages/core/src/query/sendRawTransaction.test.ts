import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { sendRawTransactionMutationOptions } from './sendRawTransaction.js'

test('default', () => {
  expect(sendRawTransactionMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "sendRawTransaction",
      ],
    }
  `)
})
