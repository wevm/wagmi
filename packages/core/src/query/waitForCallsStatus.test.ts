import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { waitForCallsStatusQueryOptions } from './waitForCallsStatus.js'

test('default', () => {
  expect(
    waitForCallsStatusQueryOptions(config, {
      id: '0x0000000000000000000000000000000000000000',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "callsStatus",
        {
          "id": "0x0000000000000000000000000000000000000000",
        },
      ],
      "retry": [Function],
    }
  `)
})
