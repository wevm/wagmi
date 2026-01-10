import { address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBytecodeQueryOptions } from './getBytecode.js'

test('default', () => {
  expect(
    getBytecodeQueryOptions(config, {
      address: address.wagmiMintExample,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "getBytecode",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBytecodeQueryOptions(config, {
      address: address.wagmiMintExample,
      chainId: chain.mainnet2.id,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "getBytecode",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 456,
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    getBytecodeQueryOptions(config, {
      address: address.wagmiMintExample,
      blockNumber: 1234567890n,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "getBytecode",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": 1234567890n,
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    getBytecodeQueryOptions(config, {
      address: address.wagmiMintExample,
      blockTag: 'safe',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "getBytecode",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockTag": "safe",
        },
      ],
    }
  `)
})
