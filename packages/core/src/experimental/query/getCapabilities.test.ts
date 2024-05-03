import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getCapabilitiesQueryOptions } from './getCapabilities.js'

test('default', () => {
  expect(getCapabilitiesQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "capabilities",
        {},
      ],
      "retry": [Function],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getCapabilitiesQueryOptions(config, {
      account: '0x0000000000000000000000000000000000000000',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "capabilities",
        {
          "account": "0x0000000000000000000000000000000000000000",
        },
      ],
      "retry": [Function],
    }
  `)
})
