import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useEnsName } from './useEnsName.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useEnsName({
      address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "wevm.eth",
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
        "ensName",
        {
          "address": "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
