import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getCallsStatusQueryOptions } from './getCallsStatus.js'

test('default', () => {
  expect(
    getCallsStatusQueryOptions(config, {
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
