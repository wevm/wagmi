import { accounts, chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import type { BlockTag } from 'viem'
import { getTransactionCount } from './getTransactionCount.js'

const address = accounts[0]

test('default', async () => {
  await expect(getTransactionCount(config, { address })).resolves.toBeTypeOf(
    'number',
  )
})

test('parameters: chainId', async () => {
  await testClient.mainnet2.setNonce({
    address,
    nonce: 6969,
  })
  await testClient.mainnet2.mine({ blocks: 1 })
  await expect(
    getTransactionCount(config, { address, chainId: chain.mainnet2.id }),
  ).resolves.toBeTypeOf('number')
})

test('parameters: blockNumber', async () => {
  await expect(
    getTransactionCount(config, { address, blockNumber: 13677382n }),
  ).resolves.toBeTypeOf('number')
})

test.each([
  { blockTag: 'earliest' },
  { blockTag: 'finalized' },
  { blockTag: 'latest' },
  { blockTag: 'pending' },
  { blockTag: 'safe' },
] as { blockTag: BlockTag; expected: number }[])(
  'parameters: blockTag $blockTag',
  async ({ blockTag }) => {
    await testClient.mainnet.restart()

    await expect(
      getTransactionCount(config, {
        address,
        blockTag,
      }),
    ).resolves.toBeTypeOf('number')
  },
)
