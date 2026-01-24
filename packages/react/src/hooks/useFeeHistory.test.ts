import { chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useFeeHistory } from './useFeeHistory.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = await renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
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
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
  const { result } = await renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: 18677379n,
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "blockNumber": 18677379n,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
  const { result } = await renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'safe',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "blockTag": "safe",
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: blockCount: undefined -> defined', async () => {
  const { result, rerender } = await renderHook(
    (props) =>
      useFeeHistory({
        blockCount: props?.blockCount,
        rewardPercentiles: [25, 75],
      }),
    { initialProps: { blockCount: undefined as number | undefined } },
  )

  {
    const { data, ...rest } = result.current
    expect(data).toBeTypeOf('undefined')
    expect(rest).toMatchInlineSnapshot(`
      {
        "dataUpdatedAt": 0,
        "error": null,
        "errorUpdateCount": 0,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "failureReason": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": false,
        "isFetchedAfterMount": false,
        "isFetching": false,
        "isInitialLoading": false,
        "isLoading": false,
        "isLoadingError": false,
        "isPaused": false,
        "isPending": true,
        "isPlaceholderData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": false,
        "isSuccess": false,
        "queryKey": [
          "feeHistory",
          {
            "blockCount": undefined,
            "chainId": 1,
            "rewardPercentiles": [
              25,
              75,
            ],
          },
        ],
        "refetch": [Function],
        "status": "pending",
      }
    `)
  }

  rerender({ blockCount: 4 })

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: rewardPercentiles: undefined -> defined', async () => {
  const { result, rerender } = await renderHook(
    (props) =>
      useFeeHistory({
        blockCount: 4,
        rewardPercentiles: props?.rewardPercentiles,
      }),
    { initialProps: { rewardPercentiles: undefined as number[] | undefined } },
  )

  {
    const { data, ...rest } = result.current
    expect(data).toBeTypeOf('undefined')
    expect(rest).toMatchInlineSnapshot(`
      {
        "dataUpdatedAt": 0,
        "error": null,
        "errorUpdateCount": 0,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "failureReason": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": false,
        "isFetchedAfterMount": false,
        "isFetching": false,
        "isInitialLoading": false,
        "isLoading": false,
        "isLoadingError": false,
        "isPaused": false,
        "isPending": true,
        "isPlaceholderData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": false,
        "isSuccess": false,
        "queryKey": [
          "feeHistory",
          {
            "blockCount": 4,
            "chainId": 1,
            "rewardPercentiles": undefined,
          },
        ],
        "refetch": [Function],
        "status": "pending",
      }
    `)
  }

  rerender({ rewardPercentiles: [25, 75] })

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { data, ...rest } = result.current
  expect(data).toMatchObject({
    baseFeePerGas: expect.arrayContaining([expect.any(BigInt)]),
    gasUsedRatio: expect.arrayContaining([expect.any(Number)]),
    oldestBlock: expect.any(BigInt),
    reward: expect.any(Array),
  })
  expect(rest).toMatchInlineSnapshot(`
    {
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": true,
      "queryKey": [
        "feeHistory",
        {
          "blockCount": 4,
          "chainId": 1,
          "rewardPercentiles": [
            25,
            75,
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useFeeHistory())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
