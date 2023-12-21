import { chain, testClient, wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useFeeHistory } from './useFeeHistory.js'

test('default', async () => {
  await testClient.mainnet.resetFork()

  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": {
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
    },
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
  await testClient.mainnet2.resetFork()

  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      chainId: chain.mainnet2.id,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": {
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
    },
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
  await testClient.mainnet.resetFork()

  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockNumber: 18677379n,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": {
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
    },
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
  await testClient.mainnet.resetFork()

  const { result } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles: [25, 75],
      blockTag: 'safe',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": {
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
    },
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
  await testClient.mainnet.resetFork()

  let blockCount: number | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useFeeHistory({
      blockCount,
      rewardPercentiles: [25, 75],
    }),
  )

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": undefined,
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
    "isStale": true,
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

  blockCount = 4
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": {
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
    },
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
  await testClient.mainnet.resetFork()

  let rewardPercentiles: number[] | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useFeeHistory({
      blockCount: 4,
      rewardPercentiles,
    }),
  )

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": undefined,
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
    "isStale": true,
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

  rewardPercentiles = [25, 75]
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
  {
    "data": {
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
    },
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
