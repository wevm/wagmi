import { chain, wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useFeeHistory } from './useFeeHistory.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: 18677379n,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'safe',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
  let blockCount: number | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useFeeHistory({
      blockCount,
      rewardPercentiles: [25, 75],
    }),
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

  blockCount = 4
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
  let rewardPercentiles: number[] | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles,
    }),
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

  rewardPercentiles = [25, 75]
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
  const { result } = renderHook(() => useFeeHistory())

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
