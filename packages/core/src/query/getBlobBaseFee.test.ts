import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlobBaseFeeQueryOptions } from './getBlobBaseFee.js'

test('default', () => {
  expect(getBlobBaseFeeQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "blobBaseFee",
        {},
      ],
    }
  `)
})
