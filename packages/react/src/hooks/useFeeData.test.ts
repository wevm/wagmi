import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useFeeData } from './useFeeData.js'

test('default', async () => {
  const { result } = renderHook(() => useFeeData())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toMatchObject(
    expect.objectContaining({
      formatted: expect.objectContaining({
        gasPrice: expect.any(String),
        maxFeePerGas: expect.any(String),
        maxPriorityFeePerGas: expect.any(String),
      }),
      gasPrice: expect.any(BigInt),
      lastBaseFeePerGas: expect.any(BigInt),
      maxFeePerGas: expect.any(BigInt),
      maxPriorityFeePerGas: expect.any(BigInt),
    }),
  )
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
      "refetch": [Function],
      "status": "success",
    }
  `)
})
