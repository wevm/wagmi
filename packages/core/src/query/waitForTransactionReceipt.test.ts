import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { waitForTransactionReceiptQueryOptions } from './waitForTransactionReceipt.js'

test('default', () => {
  expect(
    waitForTransactionReceiptQueryOptions(config, {}),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "waitForTransactionReceipt",
        {},
      ],
    }
  `)
})
