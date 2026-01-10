import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getConnectorClientQueryOptions } from './getConnectorClient.js'

test('default', () => {
  expect(getConnectorClientQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "connectorClient",
        {},
      ],
      "staleTime": Infinity,
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getConnectorClientQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "gcTime": 0,
      "queryFn": [Function],
      "queryKey": [
        "connectorClient",
        {
          "chainId": 1,
        },
      ],
      "staleTime": Infinity,
    }
  `)
})
