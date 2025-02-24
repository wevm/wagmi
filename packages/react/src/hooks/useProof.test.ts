import { chain, wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import type { Address } from 'viem'
import { useProof } from './useProof.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useProof({
      address: '0x4200000000000000000000000000000000000016',
      chainId: chain.optimism.id,
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect({ ...result.current, data: null }).toMatchInlineSnapshot(`
    {
      "data": null,
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
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "chainId": 10,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  let address: Address | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useProof({
      address,
      chainId: chain.optimism.id,
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  )

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": undefined,
      "dataUpdatedAt": 0,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isError": false,
      "isFetched": false,
      "isFetchedAfterMount": false,
      "isFetching": false,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": true,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": false,
      "isStale": false,
      "isSuccess": false,
      "queryKey": [
        "getProof",
        {
          "address": undefined,
          "chainId": 10,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  address = '0x4200000000000000000000000000000000000016'
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect({ ...result.current, data: null }).toMatchInlineSnapshot(`
    {
      "data": null,
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
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "chainId": 10,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderHook(() => useProof())

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
