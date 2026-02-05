import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { simulateBlocksQueryOptions } from './simulateBlocks.js'

const name4bytes = '0x06fdde03'

test('default', () => {
  expect(
    simulateBlocksQueryOptions(config, {
      blocks: [
        {
          calls: [
            {
              data: name4bytes,
              to: '0x',
            },
          ],
        },
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "simulateBlocks",
        {
          "blocks": [
            {
              "calls": [
                {
                  "data": "0x06fdde03",
                  "to": "0x",
                },
              ],
            },
          ],
        },
      ],
      "structuralSharing": [Function],
    }
  `)
})
