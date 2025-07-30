import { accounts, chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Hex } from 'viem'
import { expect, test, vi } from 'vitest'
import { useVerifyMessage } from './useVerifyMessage.js'

const address = accounts[0]

test('default', async () => {
  const { result } = await renderHook(() =>
    useVerifyMessage({
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = await renderHook(() =>
    useVerifyMessage({
      chainId: chain.mainnet2.id,
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 456,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
  const { result } = await renderHook(() =>
    useVerifyMessage({
      blockNumber: 12345678n,
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "blockNumber": 12345678n,
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
  const { result } = await renderHook(() =>
    useVerifyMessage({
      blockTag: 'pending',
      address,
      message: 'This is a test message for viem!',
      signature:
        '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "blockTag": "pending",
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: signature: undefined -> defined', async () => {
  const { result, rerender } = await renderHook(
    (props) =>
      useVerifyMessage({
        address,
        message: 'This is a test message for viem!',
        signature: props?.signature,
      }),
    { initialProps: { signature: undefined as Hex | undefined } },
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
        "verifyMessage",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  rerender({
    signature:
      '0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b',
  })

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyMessage",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
          "message": "This is a test message for viem!",
          "signature": "0xc4c7f2820177020d66d5fd00d084cdd3f575a868c059c29a2d7f23398d04819709a14f83d98b446dda539ca5dcb87d75aa3340eb15e66d67606850622a3420f61b",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useVerifyMessage())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
