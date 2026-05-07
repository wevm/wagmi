import { abi, address, bytecode, chain, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useReadContract } from './useReadContract.js'

test('default', async () => {
  const { result } = renderPrimitive(() =>
    useReadContract(() => ({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result).toMatchInlineSnapshot(`
    {
      "data": 10n,
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
        "readContract",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": [
            "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          ],
          "chainId": 1,
          "functionName": "balanceOf",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = renderPrimitive(() =>
    useReadContract(() => ({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      chainId: chain.mainnet2.id,
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result).toMatchInlineSnapshot(`
    {
      "data": 10n,
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
        "readContract",
        {
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "args": [
            "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          ],
          "chainId": 456,
          "functionName": "balanceOf",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: deployless read (bytecode)', async () => {
  const { result } = renderPrimitive(() =>
    useReadContract(() => ({
      abi: abi.wagmiMintExample,
      functionName: 'name',
      code: bytecode.wagmiMintExample,
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result.data).toMatchInlineSnapshot(`"wagmi"`)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderPrimitive(() => useReadContract())

  await wait(100)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})
