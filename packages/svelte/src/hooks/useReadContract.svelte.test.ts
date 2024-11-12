import { abi, address, bytecode, chain, config, wait } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { expect, test } from 'vitest'
import { useReadContract } from './useReadContract.svelte.js'

test(
  'default',
  testHook(async () => {
    const result = $derived.by(
      useReadContract(() => ({
        address: address.wagmiMintExample,
        abi: abi.wagmiMintExample,
        functionName: 'balanceOf',
        args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'] as const,
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
      {
        "data": 4n,
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
  }),
)

test(
  'parameters: chainId',
  testHook(async () => {
    const result = $derived.by(
      useReadContract(() => ({
        address: address.wagmiMintExample,
        abi: abi.wagmiMintExample,
        functionName: 'balanceOf',
        args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'] as const,
        chainId: chain.mainnet2.id,
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
      {
        "data": 4n,
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
  }),
)

test(
  'parameters: config',
  testHook(
    async () => {
      const result = $derived.by(
        useReadContract(() => ({
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: 'balanceOf',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'] as const,
          config,
        })),
      )

      await expect.poll(() => result.isSuccess).toBeTruthy()

      expect(result).toMatchInlineSnapshot(`
        {
          "data": 4n,
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
    },
    { shouldMockConfig: false },
  ),
)

test(
  'parameters: deployless read (bytecode)',
  testHook(async () => {
    const result = $derived.by(
      useReadContract(() => ({
        abi: abi.wagmiMintExample,
        functionName: 'name',
        code: bytecode.wagmiMintExample,
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result.data).toMatchInlineSnapshot(`"wagmi"`)
  }),
)

test(
  'behavior: disabled when properties missing',
  testHook(async () => {
    const result = $derived.by(useReadContract())

    await wait(100)
    await expect.poll(() => result.isPending).toBeTruthy()
  }),
)
