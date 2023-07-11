import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { prepareSendTransactionQueryOptions } from './prepareSendTransaction.js'

test('default', () => {
  expect(prepareSendTransactionQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareSendTransaction",
        {},
      ],
    }
  `)
})
