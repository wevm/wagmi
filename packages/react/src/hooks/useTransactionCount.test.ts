import { accounts, chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Address } from 'viem'
import { expect, test, vi } from 'vitest'

import { useTransactionCount } from './useTransactionCount.js'

const address = accounts[0]

test('default', async () => {
  const { result } = await renderHook(() => useTransactionCount({ address }))

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('number')
  expect(rest).toMatchInlineSnapshot(`
    {
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
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = await renderHook(() =>
    useTransactionCount({ address, chainId: chain.mainnet2.id }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('number')
  expect(rest).toMatchInlineSnapshot(`
    {
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
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 456,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
  const { result } = await renderHook(() =>
    useTransactionCount({ address, blockNumber: 13677382n }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('number')
  expect(rest).toMatchInlineSnapshot(`
    {
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
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "blockNumber": 13677382n,
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  let address: Address | undefined

  const { result, rerender } = await renderHook(() =>
    useTransactionCount({ address }),
  )

  {
    const { data, ...rest } = result.current
    expect(data).toBeTypeOf('undefined')
    expect(rest).toMatchInlineSnapshot(`
      {
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
          "transactionCount",
          {
            "address": undefined,
            "chainId": 1,
          },
        ],
        "refetch": [Function],
        "status": "pending",
      }
    `)
  }

  address = accounts[0]
  rerender()

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('number')
  expect(rest).toMatchInlineSnapshot(`
    {
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
        "transactionCount",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useTransactionCount())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
