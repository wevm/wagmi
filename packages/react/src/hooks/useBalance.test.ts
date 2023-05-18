import { accounts, testChains, testClient, wait } from '@wagmi/test'
import { type Address, parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { renderHook, waitFor } from '../../test-utils.js'
import { useBalance } from './useBalance.js'

const address = accounts[0]

beforeEach(async () => {
  await testClient.anvil.setBalance({ address, value: parseEther('10000') })
  await testClient.anvil.mine({ blocks: 1 })
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
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = renderHook(() =>
    useBalance({ address, chainId: testChains.anvilTwo.id }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "10000",
        "symbol": "WAG",
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
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test.todo('parameters: token')

test('parameters: unit', async () => {
  const { result } = renderHook(() =>
    useBalance({ address, chainId: testChains.anvilTwo.id, unit: 'wei' }),
  )

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
        "formatted": "10000000000000000000000",
        "symbol": "WAG",
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
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: watch', async () => {
  const { result } = renderHook(() => useBalance({ address, watch: true }))

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  expect(result.current.data).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "10000",
      "symbol": "ETH",
      "value": 10000000000000000000000n,
    }
  `)

  await testClient.anvil.setBalance({ address, value: parseEther('69') })
  await testClient.anvil.mine({ blocks: 1 })
  await wait(100)

  expect(result.current.data).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "10000",
      "symbol": "ETH",
      "value": 10000000000000000000000n,
    }
  `)

  await testClient.anvil.setBalance({ address, value: parseEther('420') })
  await testClient.anvil.mine({ blocks: 1 })
  await wait(100)

  expect(result.current.data).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "69",
      "symbol": "ETH",
      "value": 69000000000000000000n,
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
        "formatted": "420",
        "symbol": "ETH",
        "value": 420000000000000000000n,
      },
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "fetching",
      "isError": false,
      "isFetched": true,
      "isFetchedAfterMount": false,
      "isFetching": true,
      "isInitialLoading": false,
      "isLoading": false,
      "isLoadingError": false,
      "isPaused": false,
      "isPending": false,
      "isPlaceholderData": false,
      "isRefetchError": false,
      "isRefetching": true,
      "isStale": true,
      "isSuccess": true,
      "refetch": [Function],
      "status": "success",
    }
  `)
})
