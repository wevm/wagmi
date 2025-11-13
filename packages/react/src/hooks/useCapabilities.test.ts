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

  expect(result.current).toMatchInlineSnapshot(`
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
      "queryKey": [
        "capabilities",
        {
          "account": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
        },
      ],
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

  expect(result.current).toMatchInlineSnapshot(`
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
      "queryKey": [
        "capabilities",
        {
          "account": "0x1D5D7e139A994CeE7f360be398Ef032fE5D74fce",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  const { result } = await renderHook(() => useCapabilities())

  await vi.waitFor(() => expect(result.current.isError).toBeTruthy())

  const { error, failureReason: _, ...rest } = result.current
  expect(error?.message.includes('Connector not connected.')).toBeTruthy()
  expect(rest).toMatchInlineSnapshot(`
    {
      "data": undefined,
      "dataUpdatedAt": 0,
      "errorUpdateCount": 1,
      "errorUpdatedAt": 1675209600000,
      "failureCount": 1,
      "fetchStatus": "idle",
      "isError": true,
      "isFetched": true,
      "isFetchedAfterMount": true,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": true,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": true,
      "isSuccess": false,
      "queryKey": [
        "capabilities",
        {
          "account": undefined,
        },
      ],
      "refetch": [Function],
      "status": "error",
    }
  `)
})
