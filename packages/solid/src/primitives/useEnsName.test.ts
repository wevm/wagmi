import { testClient } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useEnsName } from './useEnsName.js'

test('default', async () => {
  await testClient.mainnet.restart()

  const { result } = renderPrimitive(() =>
    useEnsName(() => ({
      address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 15_000 })

  // result is a proxy object (store in Solid)
  // so we spread it into a new object for snapshot testing
  expect({ ...result }).toMatchInlineSnapshot(`
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
