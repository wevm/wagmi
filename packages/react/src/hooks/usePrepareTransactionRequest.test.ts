import { accounts, chain, testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther, parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'
import { usePrepareTransactionRequest } from './usePrepareTransactionRequest.js'

const targetAccount = accounts[1]

async function setup() {
  await testClient.mainnet.setBalance({
    address: targetAccount,
    value: parseEther('1'),
  })
  await testClient.mainnet.setNextBlockBaseFeePerGas({
    baseFeePerGas: parseGwei('10'),
  })
  await testClient.mainnet.mine({ blocks: 1 })
}

test('default', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "maxFeePerGas": 30500000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: account', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      account: privateKeyToAccount(
        '0x0123456789012345678901234567890123456789012345678901234567890123',
      ),
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "account": {
          "address": "0x14791697260E4c9A71f18484C9f997B308e59325",
          "publicKey": "0x046655feed4d214c261e0a6b554395596f1f1476a77d999560e5a8df9b8a1a3515217e88dd05e938efdd71b2cce322bf01da96cd42087b236e8f5043157a9c068e",
          "signMessage": [Function],
          "signTransaction": [Function],
          "signTypedData": [Function],
          "source": "privateKey",
          "type": "local",
        },
        "from": "0x14791697260E4c9A71f18484C9f997B308e59325",
        "gas": 21000n,
        "maxFeePerGas": 30500000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "nonce": 1448,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "account": {
            "address": "0x14791697260E4c9A71f18484C9f997B308e59325",
            "publicKey": "0x046655feed4d214c261e0a6b554395596f1f1476a77d999560e5a8df9b8a1a3515217e88dd05e938efdd71b2cce322bf01da96cd42087b236e8f5043157a9c068e",
            "signMessage": [Function],
            "signTransaction": [Function],
            "signTypedData": [Function],
            "source": "privateKey",
            "type": "local",
          },
          "chainId": 1,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: data', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "data": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "gas": 21320n,
        "maxFeePerGas": 30500000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "data": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      chainId: chain.mainnet2.id,
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "maxFeePerGas": 100910620335n,
        "maxPriorityFeePerGas": 62527233158n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 456,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: nonce', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      nonce: 5,
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "maxFeePerGas": 30500000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "nonce": 5,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "nonce": 5,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: gasPrice', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      gasPrice: parseGwei('10'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "gasPrice": 10000000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "legacy",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "gasPrice": 10000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: maxFeePerGas', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      maxFeePerGas: parseGwei('100'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "maxFeePerGas": 100000000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "maxFeePerGas": 100000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: maxPriorityFeePerGas', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      maxPriorityFeePerGas: parseGwei('5'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "maxFeePerGas": 17000000000n,
        "maxPriorityFeePerGas": 5000000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "maxPriorityFeePerGas": 5000000000n,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: type', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      type: 'eip1559',
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "maxFeePerGas": 30500000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "type": "eip1559",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: parameters', async () => {
  await setup()
  const { result } = renderHook(() =>
    usePrepareTransactionRequest({
      parameters: ['gas'],
      to: targetAccount,
      value: parseEther('1'),
    }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "gas": 21000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "value": 1000000000000000000n,
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
        "prepareTransactionRequest",
        {
          "chainId": 1,
          "parameters": [
            "gas",
          ],
          "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
          "value": 1000000000000000000n,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
