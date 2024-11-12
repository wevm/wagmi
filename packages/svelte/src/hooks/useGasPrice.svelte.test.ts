import { chain, testClient } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { expect, test } from 'vitest'
import { useGasPrice } from './useGasPrice.svelte'

test(
  'default',
  testHook(
    async () => {
      const result = $derived.by(useGasPrice())

      await expect.poll(() => result.isSuccess).toBeTruthy()

      expect(result).toMatchInlineSnapshot(`
        {
          "data": 2750000000n,
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
            "gasPrice",
            {
              "chainId": 1,
            },
          ],
          "refetch": [Function],
          "status": "success",
        }
      `)
    },
    {},
    async () => {
      await testClient.mainnet.restart()

      await testClient.mainnet.setNextBlockBaseFeePerGas({
        baseFeePerGas: 2_000_000_000n,
      })
      await testClient.mainnet.mine({ blocks: 1 })
    },
  ),
)

test(
  'parameters: chainId',
  testHook(
    async () => {
      const result = $derived.by(
        useGasPrice(() => ({ chainId: chain.mainnet2.id })),
      )

      await expect.poll(() => result.isSuccess).toBeTruthy()

      expect(result).toMatchInlineSnapshot(`
        {
          "data": 1875000000n,
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
            "gasPrice",
            {
              "chainId": 456,
            },
          ],
          "refetch": [Function],
          "status": "success",
        }
      `)
    },
    {},
    async () => {
      await testClient.mainnet2.restart()

      await testClient.mainnet2.setNextBlockBaseFeePerGas({
        baseFeePerGas: 1_000_000_000n,
      })
      await testClient.mainnet2.mine({ blocks: 1 })
    },
  ),
)
