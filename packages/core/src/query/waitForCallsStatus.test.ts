import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { waitForCallsStatusQueryOptions } from './waitForCallsStatus.js'

test('default', () => {
  expect(
    waitForCallsStatusQueryOptions(config, {
      id: '0x0000000000000000000000000000000000000000',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "callsStatus",
        {
          "id": "0x0000000000000000000000000000000000000000",
        },
      ],
    }
  `)
})
