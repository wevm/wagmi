import { describe, expect, test } from 'vitest'

import { config, testChains, testClient } from '../../test/index.js'
import {
  getBlockNumber,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from './getBlockNumber.js'

describe('getBlockNumber', () => {
  test('default', async () => {
    await expect(getBlockNumber(config)).resolves.toMatchInlineSnapshot(
      '16280770n',
    )
  })
})

describe('watchBlockNumber', () => {
  test('default', async () => {
    const blockNumbers: bigint[] = []
    const unwatch = watchBlockNumber(config, {
      onBlockNumber: (blockNumber) => blockNumbers.push(blockNumber),
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 100))
    await testClient.mine({ blocks: 1 })
    await new Promise((resolve) => setTimeout(resolve, 200))

    expect(blockNumbers).toEqual([16280770n, 16280771n, 16280772n, 16280773n])

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
