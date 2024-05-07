import { wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useEnsText } from './useEnsText.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useEnsText({
      key: 'com.twitter',
      name: 'wevm.eth',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "wevm_dev",
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
        "ensText",
        {
          "chainId": 1,
          "key": "com.twitter",
          "name": "wevm.eth",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: name: undefined -> defined', async () => {
  let name: string | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useEnsText({
      key: 'com.twitter',
      name,
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
      "isStale": false,
      "isSuccess": false,
      "queryKey": [
        "ensText",
        {
          "chainId": 1,
          "key": "com.twitter",
          "name": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  name = 'wevm.eth'
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "wevm_dev",
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
        "ensText",
        {
          "chainId": 1,
          "key": "com.twitter",
          "name": "wevm.eth",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderHook(() => useEnsText())

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
