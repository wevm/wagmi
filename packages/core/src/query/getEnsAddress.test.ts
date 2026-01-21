import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAddressQueryOptions } from './getEnsAddress.js'

test('default', () => {
  expect(getEnsAddressQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
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
    getEnsAddressQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "ensAddress",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
