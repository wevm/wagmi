import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getProofQueryOptions } from './getProof.js'

test('default', () => {
  expect(
    getProofQueryOptions(config, {
      address: '0x4200000000000000000000000000000000000016',
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    getProofQueryOptions(config, {
      address: '0x4200000000000000000000000000000000000016',
      blockNumber: 1234567890n,
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "blockNumber": 1234567890n,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    getProofQueryOptions(config, {
      address: '0x4200000000000000000000000000000000000016',
      blockTag: 'safe',
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "blockTag": "safe",
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getProofQueryOptions(config, {
      address: '0x4200000000000000000000000000000000000016',
      chainId: chain.mainnet2.id,
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "chainId": 456,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
    }
  `)
})
