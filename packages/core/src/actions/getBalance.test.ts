import { accounts, chain, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, describe, expect, test } from 'vitest'

import { getBalance } from './getBalance.js'

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
        "formatted": "0.559062564299199392",
        "symbol": "DAI",
        "value": 559062564299199392n,
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
