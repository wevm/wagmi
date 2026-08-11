import { chain, config, testClient } from '@wagmi/test'
import { beforeAll, expect, test } from 'vitest'

import { getFeeHistory } from './getFeeHistory.js'

beforeAll(async () => {
  await Promise.all([
    testClient.mainnet.mine({ blocks: 4 }),
    testClient.mainnet2.mine({ blocks: 4 }),
  ])
})

test('default', async () => {
  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  ).resolves.toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
})

test('parameters: chainId', async () => {
  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  ).resolves.toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
})

test('parameters: blockNumber', async () => {
  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: chain.mainnet.fork.blockNumber + 4n,
    }),
  ).resolves.toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
})

test('parameters: blockTag', async () => {
  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'latest',
    }),
  ).resolves.toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
})
