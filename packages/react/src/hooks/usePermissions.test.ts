import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { usePermissions } from './usePermissions.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const { result } = renderHook(() => usePermissions())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "caveats": [
            {
              "type": "filterResponse",
              "value": [
                "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
              ],
            },
          ],
          "invoker": "https://example.com",
          "parentCapability": "eth_accounts",
        },
      ],
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
        "getPermissions",
        {
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})
