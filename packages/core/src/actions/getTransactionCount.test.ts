import { accounts, chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionCount } from './getTransactionCount.js'

const address = accounts[0]

test('default', async () => {
  await expect(getTransactionCount(config, { address })).resolves.toBe(564)
})

test('parameters: chainId', async () => {
  await testClient.mainnet2.setNonce({
    address,
    nonce: 6969,
  })
  await testClient.mainnet2.mine({ blocks: 1 })
  await expect(
    getTransactionCount(config, { address, chainId: chain.mainnet2.id }),
  ).resolves.toBe(6969)
})

test('parameters: blockNumber', async () => {
  await expect(
    getTransactionCount(config, { address, blockNumber: 13677382n }),
  ).resolves.toBe(82)
})

test('parameters: blockTag', async () => {
  await expect(
    getTransactionCount(config, {
      address,
      blockTag: 'earliest',
    }),
  ).resolves.toBe(0)

  await expect(
    getTransactionCount(config, {
      address,
      blockTag: 'finalized',
    }),
  ).resolves.toBe(564)

  await expect(
    getTransactionCount(config, {
      address,
      blockTag: 'latest',
    }),
  ).resolves.toBe(564)

  await expect(
    getTransactionCount(config, {
      address,
      blockTag: 'pending',
    }),
  ).resolves.toBe(564)

  await expect(
    getTransactionCount(config, {
      address,
      blockTag: 'safe',
    }),
  ).resolves.toBe(564)
})
