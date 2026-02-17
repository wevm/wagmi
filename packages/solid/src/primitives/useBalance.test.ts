import { accounts, chain, testClient, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { createSignal } from 'solid-js'
import { type Address, parseEther } from 'viem'
import { beforeEach, expect, test, vi } from 'vitest'
import { useBalance } from './useBalance.js'

const address = accounts[0]

beforeEach(async () => {
  await testClient.mainnet.setBalance({ address, value: parseEther('10000') })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet2.setBalance({ address, value: parseEther('69') })
  await testClient.mainnet2.mine({ blocks: 1 })
})

test('default', async () => {
  const { result } = renderPrimitive(() => useBalance(() => ({ address })))

  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

  const { data, ...rest } = result
  expect(data).toMatchObject(
    expect.objectContaining({
      decimals: expect.any(Number),
      symbol: expect.any(String),
      value: expect.any(BigInt),
    }),
  )
  expect(rest).toMatchInlineSnapshot(`
    {
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
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('parameters: chainId', async () => {
  const { result } = renderPrimitive(() =>
    useBalance(() => ({ address, chainId: chain.mainnet2.id })),
  )

  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

  expect(result).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
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
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 456,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  const [address, setAddress] = createSignal<Address>()

  const { result } = renderPrimitive(() =>
    useBalance(() => ({ address: address() })),
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

  setAddress(accounts[0])

  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

  expect(result).toMatchInlineSnapshot(`
    {
      "data": {
        "decimals": 18,
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
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = renderPrimitive(() => useBalance())

  await wait(100)
  await vi.waitFor(() => expect(result.isPending).toBeTruthy())
})
