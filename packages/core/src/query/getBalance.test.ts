import { accounts, config, testChains } from '@wagmi/test'
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
            "chainId": undefined,
            "token": undefined,
            "unit": undefined,
          },
        ],
      }
    `)
})

test('parameters: chainId', () => {
  expect(
    getBalanceQueryOptions(config, { address, chainId: testChains.anvil.id }),
  ).toMatchInlineSnapshot(`
      {
        "queryFn": [Function],
        "queryKey": [
          "balance",
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "chainId": 123,
            "token": undefined,
            "unit": undefined,
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
      chainId: testChains.anvil.id,
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
            "chainId": 123,
            "token": "0x0000000000000000000000000000000000000000",
            "unit": "gwei",
          },
        ],
      }
    `)
})
