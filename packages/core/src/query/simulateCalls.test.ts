import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { simulateCallsQueryOptions } from './simulateCalls.js'

const name4bytes = '0x06fdde03'

test('default', () => {
  expect(
    simulateCallsQueryOptions(config, {
      calls: [
        {
          data: name4bytes,
          to: '0x',
        },
      ],
      traceAssetChanges: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "simulateCalls",
        {
          "calls": [
            {
              "data": "0x06fdde03",
              "to": "0x",
            },
          ],
          "traceAssetChanges": true,
        },
      ],
      "structuralSharing": [Function],
    }
  `)
})
