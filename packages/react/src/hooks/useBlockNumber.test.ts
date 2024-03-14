import { testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useBlockNumber } from './useBlockNumber.js'

test('mounts', async () => {
  await testClient.mainnet.resetFork()

  const { result } = renderHook(() => useBlockNumber())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": 19258213n,
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
        "blockNumber",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: watch', async () => {
  await testClient.mainnet.resetFork()

  const { result } = renderHook(() => useBlockNumber({ watch: true }))

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  const blockNumber = result.current.data!
  expect(result.current.data).toMatchInlineSnapshot('19258213n')

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(() => {
    expect(result.current.data).toEqual(blockNumber + 1n)
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(() => {
    expect(result.current.data).toEqual(blockNumber + 2n)
  })
})
