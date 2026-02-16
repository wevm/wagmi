import { address, chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Address } from 'viem'
import { expect, test, vi } from 'vitest'
import { useStorageAt } from './useStorageAt.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useStorageAt({
      address: address.wagmiMintExample,
      slot: '0x0',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
  const { result } = await renderHook(() =>
    useStorageAt({
      address: address.wagmiMintExample,
      blockNumber: 16280770n,
      slot: '0x0',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": 16280770n,
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
  const { result } = await renderHook(() =>
    useStorageAt({
      address: address.wagmiMintExample,
      blockTag: 'safe',
      slot: '0x0',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockTag": "safe",
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = await renderHook(() =>
    useStorageAt({
      address: address.wagmiMintExample,
      chainId: chain.optimism.id,
      slot: '0x0',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 10,
          "slot": "0x0",
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
      useStorageAt({
        address: props?.address,
        slot: '0x0',
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
        "getStorageAt",
        {
          "address": undefined,
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  rerender({ address: address.wagmiMintExample })

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })
  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": "0x7761676d6900000000000000000000000000000000000000000000000000000a",
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
        "getStorageAt",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "slot": "0x0",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useStorageAt())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
