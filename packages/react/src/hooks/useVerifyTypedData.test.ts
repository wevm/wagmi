import { typedData, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Hex } from 'viem'
import { expect, test, vi } from 'vitest'

import { useVerifyTypedData } from './useVerifyTypedData.js'

const smartAccountAddress = '0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145'
const notDeployedAddress = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'

test('valid signature', async () => {
  const { result } = await renderHook(() =>
    useVerifyTypedData({
      ...typedData.basic,
      primaryType: 'Mail',
      address: smartAccountAddress,
      signature:
        '0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyTypedData",
        {
          "address": "0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145",
          "chainId": 1,
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('invalid signature', async () => {
  const { result } = await renderHook(() =>
    useVerifyTypedData({
      ...typedData.basic,
      primaryType: 'Mail',
      address: smartAccountAddress,
      signature: '0xdead',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": false,
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
        "verifyTypedData",
        {
          "address": "0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145",
          "chainId": 1,
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0xdead",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('account not deployed', async () => {
  const { result } = await renderHook(() =>
    useVerifyTypedData({
      ...typedData.basic,
      primaryType: 'Mail',
      address: notDeployedAddress,
      signature:
        '0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": false,
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
        "verifyTypedData",
        {
          "address": "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
          "chainId": 1,
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: signature: undefined -> defined', async () => {
  const { result, rerender } = await renderHook(
    (props) =>
      useVerifyTypedData({
        ...typedData.basic,
        primaryType: 'Mail',
        address: smartAccountAddress,
        signature: props?.signature,
      }),
    { initialProps: { signature: undefined as Hex | undefined } },
  )

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
      "isStale": false,
      "isSuccess": false,
      "queryKey": [
        "verifyTypedData",
        {
          "address": "0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145",
          "chainId": 1,
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": undefined,
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  rerender({
    signature:
      '0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c',
  })

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": true,
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
        "verifyTypedData",
        {
          "address": "0x3FCf42e10CC70Fe75A62EB3aDD6D305Aa840d145",
          "chainId": 1,
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0x79d756d805073dc97b7bc885b0d56ddf319a2599530fe1e178c2a7de5be88980068d24f20a79b318ea0a84d33ae06f93db77e4235e5d9eeb8b1d7a63922ada3e1c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useVerifyTypedData())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
