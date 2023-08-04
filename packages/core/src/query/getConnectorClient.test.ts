import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getConnectorClientQueryOptions } from './getConnectorClient.js'

test('default', () => {
  expect(getConnectorClientQueryOptions(config)).toMatchInlineSnapshot(`
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
    getConnectorClientQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "connectorClient",
        {
          "chainId": 123,
          "connectorUid": undefined,
        },
      ],
    }
  `)
})
