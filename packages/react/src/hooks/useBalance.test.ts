import { accounts, chain, testClient, wait } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { type Address, parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { useBalance } from './useBalance.js'

const address = accounts[0]

beforeEach(async () => {
  await testClient.mainnet.setBalance({ address, value: parseEther('10000') })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet2.setBalance({ address, value: parseEther('69') })
  await testClient.mainnet2.mine({ blocks: 1 })
})

test('default', async () => {
  const { result } = renderHook(() => useBalance({ address }))

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "10000",
        "symbol": "ETH",
        "value": 10000000000000000000000n,
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
        "balance",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = renderHook(() =>
    useBalance({ address, chainId: chain.mainnet2.id }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "69",
        "symbol": "WAG",
        "value": 69000000000000000000n,
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
        "balance",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 456,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: token', async () => {
  const { result } = renderHook(() =>
    useBalance({
      address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
      token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "0.559062564299199392",
        "symbol": "DAI",
        "value": 559062564299199392n,
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
        "balance",
        {
          "address": "0x4557B18E779944BFE9d78A672452331C186a9f48",
          "chainId": 1,
          "token": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: unit', async () => {
  const { result } = renderHook(() =>
    useBalance({ address, chainId: chain.mainnet2.id, unit: 'wei' }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "69000000000000000000",
        "symbol": "WAG",
        "value": 69000000000000000000n,
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
        "balance",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 456,
          "unit": "wei",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  let address: Address | undefined = undefined

  const { result, rerender } = renderHook(() => useBalance({ address }))

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
      "isStale": true,
      "isSuccess": false,
      "queryKey": [
        "balance",
        {
          "address": undefined,
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  address = accounts[0]
  rerender()

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "10000",
        "symbol": "ETH",
        "value": 10000000000000000000000n,
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
        "balance",
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderHook(() => useBalance())

  await wait(100)
  await waitFor(() => expect(result.current.isPending).toBeTruthy())
})
