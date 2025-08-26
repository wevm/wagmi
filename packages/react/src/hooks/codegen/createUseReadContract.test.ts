import {
  connect,
  createConfig,
  disconnect,
  http,
  mock,
  switchChain,
} from '@wagmi/core'
import { abi, accounts, address, chain, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'
import { createUseReadContract } from './createUseReadContract.js'

test('default', async () => {
  const useReadWagmiMintExample = createUseReadContract({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
  })

  const { result } = await renderHook(() =>
    useReadWagmiMintExample({
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
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
})

test('multichain', async () => {
  const useReadWagmiMintExample = createUseReadContract({
    address: {
      [chain.mainnet.id]: address.wagmiMintExample,
      [chain.mainnet2.id]: address.wagmiMintExample,
    },
    abi: abi.wagmiMintExample,
  })

  const { result } = await renderHook(() =>
    useReadWagmiMintExample({
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      chainId: chain.mainnet2.id,
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
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
})

test('functionName', async () => {
  const useReadWagmiMintExampleBalanceOf = createUseReadContract({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
    functionName: 'balanceOf',
  })

  const { result } = await renderHook(() =>
    useReadWagmiMintExampleBalanceOf({
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
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
})

test('behavior: syncConnectedChain on', async () => {
  await disconnect(config)
  await connect(config, {
    connector: config.connectors[0]!,
    chainId: chain.mainnet.id,
  })

  const useReadWagmiMintExample = createUseReadContract({
    address: {
      [chain.mainnet.id]: address.wagmiMintExample,
      [chain.mainnet2.id]: address.wagmiMintExample,
    },
    abi: abi.wagmiMintExample,
  })

  const { rerender, result } = await renderHook(() =>
    useReadWagmiMintExample({
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, {
    timeout: 5_000,
  })

  expect(result.current.queryKey).toMatchInlineSnapshot(`
    [
      "readContract",
      {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": [
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        ],
        "chainId": 1,
        "functionName": "balanceOf",
      },
    ]
  `)

  await switchChain(config, { chainId: chain.mainnet2.id })

  rerender()
  await vi.waitUntil(() => result.current.isSuccess, {
    timeout: 5_000,
  })

  expect(result.current.queryKey).toMatchInlineSnapshot(`
    [
      "readContract",
      {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": [
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        ],
        "chainId": 456,
        "functionName": "balanceOf",
      },
    ]
  `)

  await disconnect(config)
})

test('behavior: syncConnectedChain off', async () => {
  const config = createConfig({
    chains: [chain.mainnet, chain.mainnet2, chain.optimism],
    connectors: [mock({ accounts })],
    pollingInterval: 100,
    storage: null,
    syncConnectedChain: false,
    transports: {
      [chain.mainnet.id]: http(),
      [chain.mainnet2.id]: http(),
      [chain.optimism.id]: http(),
    },
  })

  await disconnect(config)
  await connect(config, {
    connector: config.connectors[0]!,
    chainId: chain.mainnet.id,
  })

  const useReadWagmiMintExample = createUseReadContract({
    address: {
      [chain.mainnet.id]: address.wagmiMintExample,
      [chain.mainnet2.id]: address.wagmiMintExample,
    },
    abi: abi.wagmiMintExample,
  })

  const { rerender, result } = await renderHook(() =>
    useReadWagmiMintExample({
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, {
    timeout: 5_000,
  })

  expect(result.current.queryKey).toMatchInlineSnapshot(`
    [
      "readContract",
      {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": [
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        ],
        "chainId": 456,
        "functionName": "balanceOf",
      },
    ]
  `)

  await switchChain(config, { chainId: chain.optimism.id })

  rerender()
  await vi.waitUntil(() => result.current.isSuccess, {
    timeout: 5_000,
  })

  expect(result.current.queryKey).toMatchInlineSnapshot(`
    [
      "readContract",
      {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": [
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        ],
        "chainId": 456,
        "functionName": "balanceOf",
      },
    ]
  `)

  await disconnect(config)
})
