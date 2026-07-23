import { address, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { prepareAuthorizationQueryOptions } from './prepareAuthorization.js'

test('default', () => {
  expect(prepareAuthorizationQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "prepareAuthorization",
        {},
      ],
    }
  `)
})

test('parameters: contractAddress', () => {
  expect(
    prepareAuthorizationQueryOptions(config, {
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "prepareAuthorization",
        {
          "chainId": 1,
          "contractAddress": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "nonce": 0,
        },
      ],
    }
  `)
})

test('parameters: address', () => {
  expect(
    prepareAuthorizationQueryOptions(config, {
      address: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "prepareAuthorization",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "nonce": 0,
        },
      ],
    }
  `)
})
