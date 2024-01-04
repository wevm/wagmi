import { accounts, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBalanceQueryOptions } from './getBalance.js'

const address = accounts[0]

test('default', () => {
  expect(getBalanceQueryOptions(config, { address })).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "balance",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getBalanceQueryOptions(config, { address, chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "balance",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
        },
      ],
    }
  `)
})

test.todo('parameters: token')

test('parameters: unit', () => {
  expect(
    getBalanceQueryOptions(config, {
      address,
      chainId: chain.mainnet.id,
      token: '0x0000000000000000000000000000000000000000',
      unit: 'gwei',
    }),
  ).toMatchInlineSnapshot(`
      {
        "queryFn": [Function],
        "queryKey": [
          "balance",
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "chainId": 1,
            "token": "0x0000000000000000000000000000000000000000",
            "unit": "gwei",
          },
        ],
      }
    `)
})
