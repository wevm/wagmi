import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getConnectorClientQueryOptions } from './getConnectorClient.js'

test('default', () => {
  expect(getConnectorClientQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "gcTime": 0,
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
    getConnectorClientQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "gcTime": 0,
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
