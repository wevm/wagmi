import { chain, testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useEstimateMaxPriorityFeePerGas } from './useEstimateMaxPriorityFeePerGas.js'

test('default', async () => {
  await testClient.mainnet.resetFork()

  const { result } = renderHook(() => useEstimateMaxPriorityFeePerGas())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('bigint')
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
      "estimateMaxPriorityFeePerGas",
      {
        "chainId": 1,
      },
    ],
    "refetch": [Function],
    "status": "success",
  }
  `)
})

test('parameters: chainId', async () => {
  await testClient.mainnet2.resetFork()
  await testClient.mainnet2.mine({ blocks: 1 })

  const { result } = renderHook(() =>
    useEstimateMaxPriorityFeePerGas({ chainId: chain.mainnet2.id }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('bigint')
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
      "estimateMaxPriorityFeePerGas",
      {
        "chainId": 456,
      },
    ],
    "refetch": [Function],
    "status": "success",
  }
  `)
})
