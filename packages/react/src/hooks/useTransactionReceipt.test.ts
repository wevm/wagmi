import { chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Hash } from 'viem'
import { expect, test, vi } from 'vitest'
import { useTransactionReceipt } from './useTransactionReceipt.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useTransactionReceipt({
      hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "blockHash": "0xb932f77cf770d1d1c8f861153eec1e990f5d56b6ffdb4ac06aef3cca51ef37d4",
        "blockNumber": 16280769n,
        "contractAddress": null,
        "cumulativeGasUsed": 21000n,
        "effectiveGasPrice": 33427926161n,
        "from": "0x043022ef9fca1066024d19d681e2ccf44ff90de3",
        "gasUsed": 21000n,
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "success",
        "to": "0x318a5fb4f1604fc46375a1db9a9018b6e423b345",
        "transactionHash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        "transactionIndex": 0,
        "type": "legacy",
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
        "getTransactionReceipt",
        {
          "chainId": 1,
          "hash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = await renderHook(() =>
    useTransactionReceipt({
      chainId: chain.mainnet2.id,
      hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "blockHash": "0xb932f77cf770d1d1c8f861153eec1e990f5d56b6ffdb4ac06aef3cca51ef37d4",
        "blockNumber": 16280769n,
        "contractAddress": null,
        "cumulativeGasUsed": 21000n,
        "effectiveGasPrice": 33427926161n,
        "from": "0x043022ef9fca1066024d19d681e2ccf44ff90de3",
        "gasUsed": 21000n,
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "success",
        "to": "0x318a5fb4f1604fc46375a1db9a9018b6e423b345",
        "transactionHash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        "transactionIndex": 0,
        "type": "legacy",
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
        "getTransactionReceipt",
        {
          "chainId": 456,
          "hash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: hash: undefined -> defined', async () => {
  const { result, rerender } = await renderHook(
    (props) =>
      useTransactionReceipt({
        hash: props?.hash,
      }),
    { initialProps: { hash: undefined as Hash | undefined } },
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
        "getTransactionReceipt",
        {
          "chainId": 1,
          "hash": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  rerender({
    hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
  })

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "blockHash": "0xb932f77cf770d1d1c8f861153eec1e990f5d56b6ffdb4ac06aef3cca51ef37d4",
        "blockNumber": 16280769n,
        "contractAddress": null,
        "cumulativeGasUsed": 21000n,
        "effectiveGasPrice": 33427926161n,
        "from": "0x043022ef9fca1066024d19d681e2ccf44ff90de3",
        "gasUsed": 21000n,
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "success",
        "to": "0x318a5fb4f1604fc46375a1db9a9018b6e423b345",
        "transactionHash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        "transactionIndex": 0,
        "type": "legacy",
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
        "getTransactionReceipt",
        {
          "chainId": 1,
          "hash": "0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useTransactionReceipt())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
