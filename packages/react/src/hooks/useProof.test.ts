import { chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Address } from 'viem'
import { expect, test, vi } from 'vitest'
import { useProof } from './useProof.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useProof({
      address: '0x4200000000000000000000000000000000000016',
      chainId: chain.optimism.id,
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

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
  const { result, rerender } = await renderHook(
    (props) =>
      useProof({
        address: props?.address,
        chainId: chain.optimism.id,
        storageKeys: [
          '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
        ],
      }),
    { initialProps: { address: undefined as Address | undefined } },
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

  rerender({ address: '0x4200000000000000000000000000000000000016' })

  await vi.waitUntil(() => result.current.isSuccess)

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
  const { result } = await renderHook(() => useProof())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
