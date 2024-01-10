import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getFeeHistory } from './getFeeHistory.js'

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
      blockNumber: 18677379n,
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
      blockTag: 'safe',
    }),
  ).resolves.toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
})
