import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAddressQueryOptions } from './getEnsAddress.js'

test('default', () => {
  expect(getEnsAddressQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensAddress",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getEnsAddressQueryOptions(config, { chainId: testChains.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensAddress",
        {
          "chainId": 123,
        },
      ],
    }
  `)
})
