import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { deepUnref } from '../utils/cloneDeep.js'
import { useEnsName } from './useEnsName.js'

test('default', async () => {
  const [result] = renderComposable(() =>
    useEnsName({
      address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    }),
  )

  await waitFor(result.isSuccess)

  expect(deepUnref(result)).toMatchInlineSnapshot(`
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
      "suspense": [Function],
    }
  `)
})
