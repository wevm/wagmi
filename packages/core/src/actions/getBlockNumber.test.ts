import { config, testClient } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { getBlockNumber, watchBlockNumber } from './getBlockNumber.js'

describe('getBlockNumber', () => {
  test('default', async () => {
    await expect(getBlockNumber(config)).resolves.toBeDefined()
  })
})

describe('watchBlockNumber', () => {
  test('default', async () => {
    const blockNumbers: bigint[] = []
    const unwatch = watchBlockNumber(config, {
      onBlockNumber(blockNumber) {
        blockNumbers.push(blockNumber)
      },
    })

    await testClient.anvil.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.anvil.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.anvil.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(blockNumbers.length).toBe(3)
    expect(
      blockNumbers.map((blockNumber) => blockNumber - blockNumbers[0]!),
    ).toEqual([0n, 1n, 2n])

    unwatch()
  })
})
