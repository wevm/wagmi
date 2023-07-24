import { accounts, chain, config, testClient, wait } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, describe, expect, test } from 'vitest'

import {
  type GetBalanceReturnType,
  getBalance,
  watchBalance,
} from './getBalance.js'

const address = accounts[0]

beforeEach(async () => {
  await testClient.mainnet.setBalance({
    address,
    value: parseEther('10000'),
  })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet2.setBalance({
    address,
    value: parseEther('420'),
  })
  await testClient.mainnet2.mine({ blocks: 1 })
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

    await testClient.mainnet.setBalance({
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

  test('parameters: chainId', async () => {
    await expect(
      getBalance(config, { address, chainId: chain.mainnet2.id }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "420",
        "symbol": "WAG",
        "value": 420000000000000000000n,
      }
    `)
  })

  test('parameters: token', async () => {
    await expect(
      getBalance(config, {
        address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
        token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "17019.35",
        "symbol": "DAI",
        "value": 17019350000000000000000n,
      }
    `)
  })

  test('parameters: unit', async () => {
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

    await testClient.mainnet.setBalance({ address, value: parseEther('69') })
    await testClient.mainnet.mine({ blocks: 1 })
    await wait(100)

    await testClient.mainnet.setBalance({ address, value: parseEther('69420') })
    await testClient.mainnet.mine({ blocks: 1 })
    await wait(100)

    await testClient.mainnet.setBalance({ address, value: parseEther('42069') })
    await testClient.mainnet.mine({ blocks: 1 })
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

  test('parameters: chainId', async () => {
    const balances: GetBalanceReturnType[] = []
    const unwatch = watchBalance(config, {
      address,
      chainId: chain.mainnet2.id,
      onBalance: (balance) => balances.push(balance),
    })

    await wait(500)

    await testClient.mainnet2.setBalance({ address, value: parseEther('69') })
    await testClient.mainnet2.mine({ blocks: 1 })

    // Perform another call to the other chain to make sure it doesn't propagate there.
    await testClient.mainnet.setBalance({ address, value: parseEther('420') })
    await testClient.mainnet.mine({ blocks: 1 })
    await wait(100)

    expect(balances).toMatchInlineSnapshot(`
      [
        {
          "decimals": 18,
          "formatted": "420",
          "symbol": "WAG",
          "value": 420000000000000000000n,
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

  test.todo('parameters: syncConnectedChain')

  test.todo('parameters: token')

  test('parameters: unit', async () => {
    const balances: GetBalanceReturnType[] = []
    const unwatch = watchBalance(config, {
      address,
      unit: 'wei',
      onBalance: (balance) => balances.push(balance),
    })

    await wait(500)

    await testClient.mainnet.setBalance({ address, value: parseEther('69') })
    await testClient.mainnet.mine({ blocks: 1 })
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

  test('parameters: onError', async () => {
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
