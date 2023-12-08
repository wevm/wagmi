import { accounts, chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getTransactionCount } from './getTransactionCount.js'
import type { BlockTag } from 'viem'

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

test.each([
  { blockTag: 'earliest', expected: 0 },
  { blockTag: 'finalized', expected: 564 },
  { blockTag: 'latest', expected: 564 },
  { blockTag: 'pending', expected: 564 },
  { blockTag: 'safe', expected: 564 },
] as { blockTag: BlockTag; expected: number }[])(
  'parameters: blockTag $blockTag',
  async ({ blockTag, expected }) => {
    await testClient.mainnet.resetFork()

    await expect(
      getTransactionCount(config, {
        address,
        blockTag,
      }),
    ).resolves.toBe(expected)
  },
)
