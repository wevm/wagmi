import { describe, expect, test } from 'vitest'

import { accounts, config, testChains, testClient } from '../../test/index.js'
import { getBalance, getBalanceQueryOptions } from './getBalance.js'
import { parseEther } from 'viem'

const address = accounts[0]

describe('getBalance', () => {
  test('default', async () => {
    await expect(
      getBalance(config, { address }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "10000",
        "symbol": "ETH",
        "value": 10000000000000000000000n,
      }
    `)

    await testClient.setBalance({
      address,
      value: parseEther('6969.12222215666'),
    })
    await expect(
      getBalance(config, { address }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "6969.12222215666",
        "symbol": "ETH",
        "value": 6969122222156660000000n,
      }
    `)
  })

  test('args: chainId', async () => {
    await expect(
      getBalance(config, { address, chainId: testChains.anvilTwo.id }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "10000",
        "symbol": "WAG",
        "value": 10000000000000000000000n,
      }
    `)
  })

  test.todo('args: token')

  test('args: unit', async () => {
    await expect(
      getBalance(config, { address, unit: 'wei' }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "6969122222156660000000",
        "symbol": "ETH",
        "value": 6969122222156660000000n,
      }
    `)
  })
})

describe('getBalanceQueryOptions', () => {
  test('default', () => {
    expect(getBalanceQueryOptions(config, { address })).toMatchInlineSnapshot(`
      {
        "queryFn": [Function],
        "queryKey": [
          "blockNumber",
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

  test('args: chainId', () => {
    expect(
      getBalanceQueryOptions(config, { address, chainId: testChains.anvil.id }),
    ).toMatchInlineSnapshot(`
      {
        "queryFn": [Function],
        "queryKey": [
          "blockNumber",
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

  test.todo('args: token')

  test('args: unit', () => {
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
          "blockNumber",
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

  test('queryFn', async () => {
    expect(
      getBalanceQueryOptions(config, {
        address,
        chainId: testChains.anvil.id,
      }).queryFn(),
    ).toBeDefined()
  })
})
