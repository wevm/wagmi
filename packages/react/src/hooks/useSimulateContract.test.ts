import { connect, disconnect } from '@wagmi/core'
import { abi, address, config, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useSimulateContract } from './useSimulateContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() =>
    useSimulateContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "chainId": 1,
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
            "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": undefined,
          "chainId": 1,
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
      "queryKey": [
        "simulateContract",
        {
          "account": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "chainId": 1,
          "functionName": "mint",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useSimulateContract())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
