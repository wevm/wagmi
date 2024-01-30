import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useEnsAvatar } from './useEnsAvatar.js'

// TODO: Enable once `euc.li` returns `'content-type'` header again
test.skip('default', async () => {
  const { result } = renderHook(() =>
    useEnsAvatar({
      name: 'wevm.eth',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

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
