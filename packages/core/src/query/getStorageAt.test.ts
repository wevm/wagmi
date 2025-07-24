import { address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getStorageAtQueryOptions } from './getStorageAt.js'

test('default', () => {
  expect(
    getStorageAtQueryOptions(config, {
      address: address.wagmiMintExample,
      slot: '0x0',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "slot": "0x0",
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    getStorageAtQueryOptions(config, {
      address: address.wagmiMintExample,
      blockNumber: 16280770n,
      slot: '0x0',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": 16280770n,
          "slot": "0x0",
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    getStorageAtQueryOptions(config, {
      address: address.wagmiMintExample,
      blockTag: 'safe',
      slot: '0x0',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockTag": "safe",
          "slot": "0x0",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getStorageAtQueryOptions(config, {
      address: address.wagmiMintExample,
      chainId: chain.mainnet2.id,
      slot: '0x0',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 456,
          "slot": "0x0",
        },
      ],
    }
  `)
})
