import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getWalletClientQueryOptions } from './getWalletClient.js'

test('default', () => {
  expect(getWalletClientQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "connectorClient",
        {
          "connectorUid": undefined,
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getWalletClientQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "connectorClient",
        {
          "chainId": 1,
          "connectorUid": undefined,
        },
      ],
    }
  `)
})
