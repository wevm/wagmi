import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useCapabilities } from './useCapabilities.js'

const connector = config.connectors[0]!

test('mounts', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useCapabilities())

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { queryKey: _, ...rest } = result.current
  expect(rest).toMatchInlineSnapshot(`
    {
      "data": {
        "8453": {
          "paymasterService": {
            "supported": true,
          },
          "sessionKeys": {
            "supported": true,
          },
        },
        "84532": {
          "paymasterService": {
            "supported": true,
          },
        },
      },
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
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('args: account', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() =>
    useCapabilities({ account: accounts[1] }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  const { queryKey: _, ...rest } = result.current
  expect(rest).toMatchInlineSnapshot(`
    {
      "data": {
        "8453": {
          "paymasterService": {
            "supported": false,
          },
          "sessionKeys": {
            "supported": true,
          },
        },
        "84532": {
          "paymasterService": {
            "supported": false,
          },
        },
      },
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
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})
