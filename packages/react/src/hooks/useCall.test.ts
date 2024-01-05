import { accounts, address, chain } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useCall } from './useCall.js'

const name4bytes = '0x06fdde03'

const account = accounts[0]

test('default', async () => {
  const { result } = renderHook(() =>
    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
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
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 1,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockTag', async () => {
  const { result } = renderHook(() =>
    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockTag: 'safe',
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
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
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "blockTag": "safe",
          "chainId": 1,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: blockNumber', async () => {
  const { result } = renderHook(() =>
    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockNumber: 16280770n,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
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
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "blockNumber": 16280770n,
          "chainId": 1,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = renderHook(() =>
    useCall({
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      chainId: chain.mainnet2.id,
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
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
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 456,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
