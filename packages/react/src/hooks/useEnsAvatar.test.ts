import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useEnsAvatar } from './useEnsAvatar.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useEnsAvatar({
      name: 'wagmi-dev.eth',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio",
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
          "chainId": 123,
          "name": "wagmi-dev.eth",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
