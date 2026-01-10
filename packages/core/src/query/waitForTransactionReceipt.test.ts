import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { waitForTransactionReceiptQueryOptions } from './waitForTransactionReceipt.js'

test('default', () => {
  expect(
    waitForTransactionReceiptQueryOptions(config, {}),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "waitForTransactionReceipt",
        {},
      ],
    }
  `)
})
