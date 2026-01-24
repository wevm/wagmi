import { accounts, chain, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

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

test('default', async () => {
  await expect(getBalance(config, { address })).resolves.toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "symbol": "ETH",
      "value": 10000000000000000000000n,
    }
  `)

  await testClient.mainnet.setBalance({
    address,
    value: parseEther('6969.12222215666'),
  })
  await expect(getBalance(config, { address })).resolves.toMatchInlineSnapshot(`
    {
      "decimals": 18,
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
      "symbol": "WAG",
      "value": 420000000000000000000n,
    }
  `)
})
