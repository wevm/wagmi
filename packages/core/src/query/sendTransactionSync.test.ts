import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { sendTransactionSyncMutationOptions } from './sendTransactionSync.js'

test('default', () => {
  expect(sendTransactionSyncMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "sendTransactionSync",
      ],
    }
  `)
})
