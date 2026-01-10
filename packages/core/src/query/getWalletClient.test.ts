import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getWalletClientQueryOptions } from './getWalletClient.js'

test('default', () => {
  expect(getWalletClientQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "walletClient",
        {},
      ],
      "staleTime": Infinity,
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getWalletClientQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "walletClient",
        {
          "chainId": 1,
        },
      ],
      "staleTime": Infinity,
    }
  `)
})
