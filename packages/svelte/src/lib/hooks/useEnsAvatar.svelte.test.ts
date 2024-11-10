import { expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useEnsAvatar } from './useEnsAvatar.svelte'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(
      useEnsAvatar(() => ({
        name: 'wevm.eth',
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
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
  }),
)
