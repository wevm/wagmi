import { renderHook } from '@wagmi/test/react'
import { expect, test } from 'vitest'
import { useWaitForTransactionReceipt } from './useWaitForTransactionReceipt.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useWaitForTransactionReceipt({
      hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
    }),
  )

  expect(result).toMatchInlineSnapshot(`
    {
      "current": {
        "data": undefined,
        "dataUpdatedAt": 0,
        "error": null,
        "errorUpdateCount": 0,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "failureReason": null,
        "fetchStatus": "fetching",
        "isError": false,
        "isFetched": false,
        "isFetchedAfterMount": false,
        "isFetching": true,
        "isInitialLoading": true,
        "isLoading": true,
        "isLoadingError": false,
        "isPaused": false,
        "isPending": true,
        "isPlaceholderData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": true,
        "isSuccess": false,
        "queryKey": [
          "waitForTransactionReceipt",
          {
            "chainId": 1,
            "hash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
          },
        ],
        "refetch": [Function],
        "status": "pending",
      },
    }
  `)
})

test('disabled when hash is undefined', async () => {
  const { result } = renderHook(() =>
    useWaitForTransactionReceipt({ hash: undefined }),
  )

  expect(result).toMatchInlineSnapshot(`
    {
      "current": {
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
          "waitForTransactionReceipt",
          {
            "chainId": 1,
            "hash": undefined,
          },
        ],
        "refetch": [Function],
        "status": "pending",
      },
    }
  `)
})
