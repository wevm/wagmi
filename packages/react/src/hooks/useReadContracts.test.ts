import { switchChain } from '@wagmi/core'
import { abi, address, chain, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'
import { useReadContracts } from './useReadContracts.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useReadContracts({
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

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "result": 10n,
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

test('multichain', async () => {
  const { mainnet, mainnet2 } = chain
  const { result } = await renderHook(() =>
    useReadContracts({
      contracts: [
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        },
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
        },
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet2.id,
          functionName: 'getAlive',
        },
        {
          abi: abi.mloot,
          address: address.mloot,
          chainId: mainnet2.id,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
        },
        // {
        //   abi: abi.erc20,
        //   address: address.optimism.usdc,
        //   chainId: optimism.id,
        //   functionName: 'symbol',
        // },
        // {
        //   abi: abi.erc20,
        //   address: address.optimism.usdc,
        //   chainId: optimism.id,
        //   functionName: 'balanceOf',
        //   args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        // },
      ],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 60_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "result": 2n,
          "status": "success",
        },
        {
          "result": 1n,
          "status": "success",
        },
        {
          "result": 0n,
          "status": "success",
        },
        {
          "result": false,
          "status": "success",
        },
        {
          "result": 370395n,
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
          "contracts": [
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "args": [
                "0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c",
              ],
              "chainId": 1,
              "functionName": "love",
            },
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "args": [
                "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
              ],
              "chainId": 1,
              "functionName": "love",
            },
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "args": [
                "0xd2135CfB216b74109775236E36d4b433F1DF507B",
              ],
              "chainId": 1,
              "functionName": "love",
            },
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "chainId": 456,
              "functionName": "getAlive",
            },
            {
              "address": "0x1dfe7ca09e99d10835bf73044a23b73fc20623df",
              "args": [
                "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
                0n,
              ],
              "chainId": 456,
              "functionName": "tokenOfOwnerByIndex",
            },
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
}, 60_000)

test('behavior: all same chainId', async () => {
  const { mainnet, mainnet2 } = chain
  await switchChain(config, { chainId: mainnet2.id })
  const { result } = await renderHook(() =>
    useReadContracts({
      contracts: [
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        },
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
        {
          abi: abi.wagmigotchi,
          address: address.wagmigotchi,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
        },
      ],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": [
        {
          "result": 2n,
          "status": "success",
        },
        {
          "result": 1n,
          "status": "success",
        },
        {
          "result": 0n,
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
          "contracts": [
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "args": [
                "0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c",
              ],
              "chainId": 1,
              "functionName": "love",
            },
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "args": [
                "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
              ],
              "chainId": 1,
              "functionName": "love",
            },
            {
              "address": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
              "args": [
                "0xd2135CfB216b74109775236E36d4b433F1DF507B",
              ],
              "chainId": 1,
              "functionName": "love",
            },
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
