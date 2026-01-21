import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getCapabilitiesQueryOptions } from './getCapabilities.js'

test('default', () => {
  expect(getCapabilitiesQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "capabilities",
        {},
      ],
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
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "capabilities",
        {
          "account": "0x0000000000000000000000000000000000000000",
        },
      ],
    }
  `)
})
