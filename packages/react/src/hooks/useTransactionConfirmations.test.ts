import { config, wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { type Hash } from 'viem'
import { expect, test } from 'vitest'

import { getTransactionReceipt } from '@wagmi/core'
import { useTransactionConfirmations } from './useTransactionConfirmations.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useTransactionConfirmations({
      hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('bigint')
  expect(rest).toMatchInlineSnapshot()
})

test('parameters: transactionReceipt', async () => {
  const transactionReceipt = await getTransactionReceipt(config, {
    hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
  })

  const { result } = renderHook(() =>
    useTransactionConfirmations({
      transactionReceipt,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('bigint')
  expect(rest).toMatchInlineSnapshot()
})

test('behavior: hash: undefined -> defined', async () => {
  let hash: Hash | undefined = undefined

  const { result, rerender } = renderHook(() =>
    useTransactionConfirmations({
      hash,
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
      "isStale": true,
      "isSuccess": false,
      "queryKey": [
        "transactionConfirmations",
        {
          "chainId": 1,
          "hash": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  hash = '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30'
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { data, ...rest } = result.current
  expect(data).toBeTypeOf('bigint')
  expect(rest).toMatchInlineSnapshot()
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderHook(() => useTransactionConfirmations())

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
