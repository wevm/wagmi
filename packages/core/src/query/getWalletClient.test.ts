import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getWalletClientQueryOptions } from './getWalletClient.js'

test('default', () => {
  expect(getWalletClientQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "walletClient",
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
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "walletClient",
        {
          "chainId": 1,
          "connectorUid": undefined,
        },
      ],
    }
  `)
})
