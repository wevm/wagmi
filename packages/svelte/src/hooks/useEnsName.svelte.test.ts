import { expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useEnsName } from './useEnsName.svelte'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(
      useEnsName(() => ({
        address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
      {
        "data": "wevm.eth",
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
  }),
)
