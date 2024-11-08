import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getFeeHistoryQueryOptions } from './getFeeHistory.js'

test('default', async () => {
  expect(
    getFeeHistoryQueryOptions(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
    }
  `)
})

test('parameters: chainId', async () => {
  expect(
    getFeeHistoryQueryOptions(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 456,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
    }
  `)
})

test('parameters: blockNumber', async () => {
  expect(
    getFeeHistoryQueryOptions(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: 18677379n,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "blockNumber": 18677379n,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
    }
  `)
})

test('parameters: blockTag', async () => {
  expect(
    getFeeHistoryQueryOptions(config, {
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'safe',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "blockTag": "safe",
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
    }
  `)
})

test('behavior: blockCount is required', async () => {
  const options = getFeeHistoryQueryOptions(config, {})
  expect(
    options.queryFn({
      queryKey: options.queryKey,
      signal: new AbortSignal(),
      meta: undefined,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: blockCount is required]',
  )
})

test('behavior: rewardPercentiles is required', async () => {
  const options = getFeeHistoryQueryOptions(config, { blockCount: 4 })
  expect(
    options.queryFn({
      queryKey: options.queryKey,
      signal: new AbortSignal(),
      meta: undefined,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: rewardPercentiles is required]',
  )
})
