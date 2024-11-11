import { accounts, chain, testClient, wait } from '@wagmi/test'
import { flushSync } from 'svelte'
import { type Address, parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useBalance } from './useBalance.svelte.js'

const address = accounts[0]

beforeEach(async () => {
  await testClient.mainnet.setBalance({ address, value: parseEther('10000') })
  // await testClient.mainnet.mine({ blocks: 1 })
  // await testClient.mainnet2.setBalance({ address, value: parseEther('69') })
  // await testClient.mainnet2.mine({ blocks: 1 })
})

test(
  'default',
  testHook(async () => {
    const result = $derived.by(useBalance(() => ({ address })))

    await expect.poll(() => result.isSuccess).toBeTruthy()

    const { data, ...rest } = result
    expect(data).toMatchObject(
      expect.objectContaining({
        decimals: expect.any(Number),
        formatted: expect.any(String),
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
        "promise": Promise {
          "reason": [Error: experimental_prefetchInRender feature flag is not enabled],
          "status": "rejected",
        },
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
  }),
)

test(
  'parameters: chainId',
  testHook(async () => {
    const result = $derived.by(
      useBalance(() => ({ address, chainId: chain.mainnet2.id })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
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
        "promise": Promise {
          "reason": [Error: experimental_prefetchInRender feature flag is not enabled],
          "status": "rejected",
        },
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
  }),
)

test(
  'parameters: token',
  testHook(async () => {
    const result = $derived.by(
      useBalance(() => ({
        address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
        token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
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
        "promise": Promise {
          "reason": [Error: experimental_prefetchInRender feature flag is not enabled],
          "status": "rejected",
        },
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
  }),
)

test(
  'parameters: unit',
  testHook(async () => {
    const result = $derived.by(
      useBalance(() => ({
        address,
        chainId: chain.mainnet2.id,
        unit: 'wei',
      })),
    )

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
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
        "promise": Promise {
          "reason": [Error: experimental_prefetchInRender feature flag is not enabled],
          "status": "rejected",
        },
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
  }),
)

test(
  'behavior: address: undefined -> defined',
  testHook(async () => {
    let address: Address | undefined = undefined
    const result = $derived.by(useBalance(() => ({ address })))

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
        "promise": Promise {
          "reason": [Error: experimental_prefetchInRender feature flag is not enabled],
          "status": "rejected",
        },
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
    flushSync()

    await expect.poll(() => result.isSuccess).toBeTruthy()

    expect(result).toMatchInlineSnapshot(`
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
  }),
)

test(
  'behavior: disabled when properties missing',
  testHook(async () => {
    const result = $derived.by(useBalance())

    await wait(100)
    await expect.poll(() => result.isPending).toBeTruthy()
  }),
)
