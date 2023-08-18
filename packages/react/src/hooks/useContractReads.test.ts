import { abi, address } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useContractReads } from './useContractReads.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useContractReads({
      contracts: [
        {
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: 'balanceOf',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
        {
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: 'symbol',
        },
      ],
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "result": 3n,
          "status": "success",
        },
        {
          "result": "WAGMI",
          "status": "success",
        },
      ],
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
        "readContracts",
        {
          "chainId": 1,
          "contracts": [
            {
              "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
              "args": [
                "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
              ],
              "chainId": 1,
              "functionName": "balanceOf",
            },
            {
              "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
              "chainId": 1,
              "functionName": "symbol",
            },
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
