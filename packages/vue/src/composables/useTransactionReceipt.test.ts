import { chain, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { ref } from 'vue'
import { deepUnref } from '../utils/cloneDeep.js'
import { useTransactionReceipt } from './useTransactionReceipt.js'

test('default', async () => {
  const [result] = renderComposable(() =>
    useTransactionReceipt({
      hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
    }),
  )

  await waitFor(result.isSuccess)

  expect(deepUnref(result)).toMatchInlineSnapshot(`
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
      "suspense": [Function],
    }
  `)
})

test('parameters: chainId', async () => {
  const [result] = renderComposable(() =>
    useTransactionReceipt({
      chainId: chain.mainnet2.id,
      hash: '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871',
    }),
  )

  await waitFor(result.isSuccess)

  expect(deepUnref(result)).toMatchInlineSnapshot(`
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
      "suspense": [Function],
    }
  `)
})

test('behavior: hash: undefined -> defined', async () => {
  const hash = ref()

  const [result] = renderComposable(() =>
    useTransactionReceipt({
      hash,
    }),
  )

  await wait(100)
  expect(result.fetchStatus.value).toBe('idle')

  hash.value =
    '0xbf7d27700d053765c9638d3b9d39eb3c56bfc48377583e8be483d61f9f18a871'

  await waitFor(result.isSuccess)

  expect(deepUnref(result)).toMatchInlineSnapshot(`
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
          "hash": undefined,
        },
      ],
      "refetch": [Function],
      "status": "success",
      "suspense": [Function],
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const [result] = renderComposable(() => useTransactionReceipt())

  await wait(100)
  expect(result.fetchStatus.value).toBe('idle')
})
