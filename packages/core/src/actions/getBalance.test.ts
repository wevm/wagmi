import { accounts, config, testChains, testClient, wait } from '@wagmi/test'
import { beforeEach, describe, expect, test } from 'vitest'

import {
  type GetBalanceReturnType,
  getBalance,
  getBalanceQueryOptions,
  watchBalance,
} from './getBalance.js'
import { parseEther } from 'viem'

const address = accounts[0]

beforeEach(async () => {
  await testClient.anvil.setBalance({
    address,
    value: parseEther('10000'),
  })
})

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

    await testClient.anvil.setBalance({
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
        "formatted": "10000000000000000000000",
        "symbol": "ETH",
        "value": 10000000000000000000000n,
      }
    `)
  })
})

describe('watchBalance', () => {
  test('default', async () => {
    const balances: GetBalanceReturnType[] = []
    const unwatch = watchBalance(config, {
      address,
      onBalance: (balance) => balances.push(balance),
    })

    await wait(500)

    await testClient.anvil.setBalance({ address, value: parseEther('69') })
    await testClient.anvil.mine({ blocks: 1 })
    await wait(100)

    await testClient.anvil.setBalance({ address, value: parseEther('69420') })
    await testClient.anvil.mine({ blocks: 1 })
    await wait(100)

    await testClient.anvil.setBalance({ address, value: parseEther('42069') })
    await testClient.anvil.mine({ blocks: 1 })
    await wait(100)

    expect(balances).toMatchInlineSnapshot(`
      [
        {
          "decimals": 18,
          "formatted": "10000",
          "symbol": "ETH",
          "value": 10000000000000000000000n,
        },
        {
          "decimals": 18,
          "formatted": "69",
          "symbol": "ETH",
          "value": 69000000000000000000n,
        },
        {
          "decimals": 18,
          "formatted": "69420",
          "symbol": "ETH",
          "value": 69420000000000000000000n,
        },
        {
          "decimals": 18,
          "formatted": "42069",
          "symbol": "ETH",
          "value": 42069000000000000000000n,
        },
      ]
    `)

    unwatch()
  })

  test('args: chainId', async () => {
    const balances: GetBalanceReturnType[] = []
    const unwatch = watchBalance(config, {
      address,
      chainId: testChains.anvilTwo.id,
      onBalance: (balance) => balances.push(balance),
    })

    await wait(500)

    await testClient.anvilTwo.setBalance({ address, value: parseEther('69') })
    await testClient.anvilTwo.mine({ blocks: 1 })

    // Perform another call to the other chain to make sure it doesn't propagate there.
    await testClient.anvil.setBalance({ address, value: parseEther('420') })
    await testClient.anvil.mine({ blocks: 1 })
    await wait(100)

    expect(balances).toMatchInlineSnapshot(`
      [
        {
          "decimals": 18,
          "formatted": "10000",
          "symbol": "WAG",
          "value": 10000000000000000000000n,
        },
        {
          "decimals": 18,
          "formatted": "69",
          "symbol": "WAG",
          "value": 69000000000000000000n,
        },
      ]
    `)

    unwatch()
  })

  test.todo('args: syncConnectedChain')

  test.todo('args: token')

  test('args: unit', async () => {
    const balances: GetBalanceReturnType[] = []
    const unwatch = watchBalance(config, {
      address,
      unit: 'wei',
      onBalance: (balance) => balances.push(balance),
    })

    await wait(500)

    await testClient.anvil.setBalance({ address, value: parseEther('69') })
    await testClient.anvil.mine({ blocks: 1 })
    await wait(200)

    expect(balances).toMatchInlineSnapshot(`
      [
        {
          "decimals": 18,
          "formatted": "10000000000000000000000",
          "symbol": "ETH",
          "value": 10000000000000000000000n,
        },
        {
          "decimals": 18,
          "formatted": "69000000000000000000",
          "symbol": "ETH",
          "value": 69000000000000000000n,
        },
      ]
    `)

    unwatch()
  })

  test('args: onError', async () => {
    let error: Error | undefined = undefined
    const unwatch = watchBalance(config, {
      address: '0x123',
      unit: 'wei',
      onBalance: () => {},
      onError: (error_) => {
        error = error_
      },
    })

    await wait(500)

    expect(error).toBeDefined()

    unwatch()
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
      })?.queryFn(),
    ).toBeDefined()
  })
})
