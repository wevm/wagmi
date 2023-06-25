import { testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useBlockNumber } from '../useBlockNumber.js'

test('mounts', async () => {
  const { result } = renderHook(() => useBlockNumber())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": 16280770n,
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

test('watch', async () => {
  const { result } = renderHook(() => useBlockNumber({ watch: true }))

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  expect(result.current.data).toEqual(16280770n)

  await testClient.anvil.mine({ blocks: 1 })
  await waitFor(() => expect(result.current.data).toEqual(16280771n))

  await testClient.anvil.mine({ blocks: 1 })
  await waitFor(() => expect(result.current.data).toEqual(16280772n))
})
