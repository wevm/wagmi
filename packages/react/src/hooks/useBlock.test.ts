import { testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useBlock } from './useBlock.js'

test('mounts', async () => {
  const { result } = renderHook(() => useBlock())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toBeDefined()
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
        "block",
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
  await testClient.mainnet.restart()

  const { result } = renderHook(() => useBlock({ watch: true }))

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  const block = result.current.data!
  expect(block).toBeDefined()

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(() => {
    expect(result.current.data?.number).toEqual(block.number + 1n)
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(() => {
    expect(result.current.data?.number).toEqual(block.number + 2n)
  })
})
