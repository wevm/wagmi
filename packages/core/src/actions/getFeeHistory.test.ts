import { chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getFeeHistory } from './getFeeHistory.js'

test('default', async () => {
  await testClient.mainnet.resetFork()

  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "baseFeePerGas": [
        31624032653n,
        33270758490n,
        32174375541n,
        31986155981n,
        30763616579n,
      ],
      "gasUsedRatio": [
        0.7082879,
        0.3681866,
        0.47660006666666666,
        0.3471164333333333,
      ],
      "oldestBlock": 18677378n,
      "reward": [
        [
          50000000n,
          345000000n,
        ],
        [
          100000000n,
          3005000000n,
        ],
        [
          100000000n,
          2000000000n,
        ],
        [
          100000000n,
          1000000000n,
        ],
      ],
    }
  `)
})

test('parameters: chainId', async () => {
  await testClient.mainnet2.resetFork()
  await testClient.mainnet2.setNextBlockBaseFeePerGas({
    baseFeePerGas: 1_000_000_000n,
  })
  await testClient.mainnet2.mine({ blocks: 1 })

  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "baseFeePerGas": [
        875000000n,
        765625000n,
      ],
      "gasUsedRatio": [
        0,
      ],
      "oldestBlock": 18676359n,
      "reward": [
        [
          0n,
          0n,
        ],
      ],
    }
  `)
})

test('parameters: blockNumber', async () => {
  await testClient.mainnet.resetFork()

  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: 18677379n,
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "baseFeePerGas": [
        29153304830n,
        29800096163n,
        31624032653n,
        33270758490n,
        32174375541n,
      ],
      "gasUsedRatio": [
        0.5887434666666667,
        0.7448229,
        0.7082879,
        0.3681866,
      ],
      "oldestBlock": 18677376n,
      "reward": [
        [
          90574478n,
          1013009054n,
        ],
        [
          90000000n,
          3000000000n,
        ],
        [
          50000000n,
          345000000n,
        ],
        [
          100000000n,
          3005000000n,
        ],
      ],
    }
  `)
})

test('parameters: blockTag', async () => {
  await testClient.mainnet.resetFork()

  await expect(
    getFeeHistory(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'safe',
    }),
  ).resolves.toMatchInlineSnapshot(`
  {
    "baseFeePerGas": [
      32056395766n,
      32683524920n,
      33011038624n,
      32430774164n,
      32967176466n,
    ],
    "gasUsedRatio": [
      0.5782532333333333,
      0.5400830333333333,
      0.42968843333333334,
      0.5661596666666666,
    ],
    "oldestBlock": 18677346n,
    "reward": [
      [
        50000000n,
        300000000n,
      ],
      [
        50000000n,
        1500000000n,
      ],
      [
        100000000n,
        1500000000n,
      ],
      [
        100000000n,
        2001000000n,
      ],
    ],
  }
  `)
})
