import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useEnsResolver } from './useEnsResolver.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useEnsResolver({
      name: 'wevm.eth',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
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
        "ensResolver",
        {
          "chainId": 1,
          "name": "wevm.eth",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
