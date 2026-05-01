import { chain, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { createSignal } from 'solid-js'
import type { Hash } from 'viem'
import { expect, test, vi } from 'vitest'
import { useTransaction } from './useTransaction.js'

test('default', async () => {
  const { result } = renderPrimitive(() =>
    useTransaction(() => ({
      hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result).toMatchInlineSnapshot(`
    {
      "data": {
        "accessList": [],
        "blockHash": "0xd725a38b51e5ceec8c5f6c9ccfdb2cc423af993bb650af5eedca5e4be7156ba7",
        "blockNumber": 15189204n,
        "chainId": 1,
        "from": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
        "gas": 21000n,
        "gasPrice": 9371645552n,
        "hash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
        "input": "0x",
        "maxFeePerGas": 13644824566n,
        "maxPriorityFeePerGas": 1500000000n,
        "nonce": 86,
        "r": "0x40174f9a38df876c1a7ce2587848819d4082ccd6d67a88aa5cabe59bf594e14f",
        "s": "0x7c0c82f62a8a5a9b0e9cf30a54a72fdae8fc54b5b79ddafef0acd30e94e83872",
        "to": "0xd2135cfb216b74109775236e36d4b433f1df507b",
        "transactionIndex": 144,
        "type": "eip1559",
        "typeHex": "0x2",
        "v": 0n,
        "value": 100000000000000000n,
        "yParity": 0,
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
        "transaction",
        {
          "chainId": 1,
          "hash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = renderPrimitive(() =>
    useTransaction(() => ({
      chainId: chain.mainnet2.id,
      hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
    })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result.queryKey).toMatchInlineSnapshot(`
    [
      "transaction",
      {
        "chainId": 456,
        "hash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
      },
    ]
  `)
})

test('behavior: hash: undefined -> defined', async () => {
  const [hash, setHash] = createSignal<Hash | undefined>(undefined)

  const { result } = renderPrimitive(() =>
    useTransaction(() => ({
      hash: hash(),
    })),
  )

  expect(result).toMatchInlineSnapshot(`
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
        "transaction",
        {
          "chainId": 1,
          "hash": undefined,
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  setHash('0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30')

  await vi.waitUntil(() => result.isSuccess, { timeout: 5_000 })

  expect(result.data).toBeDefined()
  expect(result.isSuccess).toBe(true)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderPrimitive(() => useTransaction())

  await wait(100)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})
