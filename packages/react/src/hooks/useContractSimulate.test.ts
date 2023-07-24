import { connect, disconnect } from '@wagmi/core'
import { abi, address, config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useContractSimulate } from './useContractSimulate.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() =>
    useContractSimulate({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "mode": "prepared",
        "request": {
          "abi": [
            {
              "inputs": [],
              "name": "mint",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": undefined,
          "chainId": 123,
          "dataSuffix": undefined,
          "functionName": "mint",
        },
        "result": undefined,
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
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})
