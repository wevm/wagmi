import { wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'
import { useWaitForTransactionReceipt } from './useWaitForTransactionReceipt.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useWaitForTransactionReceipt({
      hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result).toMatchInlineSnapshot(`
    {
      "current": {
        "data": {
          "blockHash": "0xd725a38b51e5ceec8c5f6c9ccfdb2cc423af993bb650af5eedca5e4be7156ba7",
          "blockNumber": 15189204n,
          "chainId": 1,
          "contractAddress": null,
          "cumulativeGasUsed": 12949744n,
          "deposit_nonce": null,
          "effectiveGasPrice": 9371645552n,
          "from": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
          "gasUsed": 21000n,
          "logs": [],
          "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "status": "success",
          "to": "0xd2135cfb216b74109775236e36d4b433f1df507b",
          "transactionHash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
          "transactionIndex": 144,
          "type": "eip1559",
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
          "waitForTransactionReceipt",
          {
            "chainId": 1,
            "hash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
          },
        ],
        "refetch": [Function],
        "status": "success",
      },
    }
  `)
})

test('disabled when hash is undefined', async () => {
  const { result } = renderHook(() =>
    useWaitForTransactionReceipt({ hash: undefined }),
  )

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
