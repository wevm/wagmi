import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useEnsAvatar } from './useEnsAvatar.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useEnsAvatar({
      name: 'wevm.eth',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "https://euc.li/wevm.eth",
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isEnabled": true,
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
      "promise": Promise {
        "reason": [Error: experimental_prefetchInRender feature flag is not enabled],
        "status": "rejected",
      },
      "queryKey": [
        "ensAvatar",
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
