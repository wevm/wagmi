import { config, testChains, testClient } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import {
  getBlockNumber,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from './getBlockNumber.js'

describe('getBlockNumber', () => {
  test('default', async () => {
    await expect(getBlockNumber(config)).resolves.toBeDefined()
  })
})

describe('watchBlockNumber', () => {
  test('default', async () => {
    const blockNumbers: bigint[] = []
    const unwatch = watchBlockNumber(config, {
      onBlockNumber: (blockNumber) => blockNumbers.push(blockNumber),
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.anvil.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.anvil.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.anvil.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(blockNumbers.length).toBe(4)
    expect(
      blockNumbers.map((blockNumber) => blockNumber - blockNumbers[0]!),
    ).toEqual([0n, 1n, 2n, 3n])

    unwatch()
  })
})

describe('getBlockNumberQueryOptions', () => {
  test('default', () => {
    expect(getBlockNumberQueryOptions(config)).toMatchInlineSnapshot(`
      {
        "gcTime": 0,
        "queryFn": [Function],
        "queryKey": [
          "blockNumber",
          {
            "chainId": undefined,
          },
        ],
      }
    `)

    expect(
      getBlockNumberQueryOptions(config, { chainId: testChains.anvil.id }),
    ).toMatchInlineSnapshot(`
      {
        "gcTime": 0,
        "queryFn": [Function],
        "queryKey": [
          "blockNumber",
          {
            "chainId": 123,
          },
        ],
      }
    `)
  })

  test('queryFn', async () => {
    expect(
      getBlockNumberQueryOptions(config, {
        chainId: testChains.anvil.id,
      }).queryFn(),
    ).toBeDefined()
  })
})
