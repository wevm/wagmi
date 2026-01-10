import { accounts, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionCountQueryOptions } from './getTransactionCount.js'

const address = accounts[0]

test('default', () => {
  expect(
    getTransactionCountQueryOptions(config, { address }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getTransactionCountQueryOptions(config, {
      address,
      chainId: chain.mainnet.id,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    getTransactionCountQueryOptions(config, {
      address,
      blockNumber: 13677382n,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "blockNumber": 13677382n,
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    getTransactionCountQueryOptions(config, {
      address,
      blockTag: 'earliest',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "blockTag": "earliest",
        },
      ],
    }
  `)
})
