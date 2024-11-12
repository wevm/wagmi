import { getBlockNumber } from '@wagmi/core'
import { config, testClient, wait } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { flushSync } from 'svelte'
import { expect, test } from 'vitest'
import { useBlockNumber } from './useBlockNumber.svelte.js'

test(
  'mounts',
  testHook(
    async () => {
      const result = $derived.by(useBlockNumber())

      await expect.poll(() => result.isSuccess).toBeTruthy()

      expect(result).toMatchInlineSnapshot(`
        {
          "data": 19258213n,
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
            "blockNumber",
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
      await testClient.mainnet.resetFork()
    },
  ),
)

test(
  'parameters: watch',
  testHook(
    async () => {
      const result = $derived.by(useBlockNumber(() => ({ watch: true })))

      await expect.poll(() => result.isSuccess).toBeTruthy()
      const blockNumber = result.data!
      expect(result.data).toMatchInlineSnapshot('19258213n')

      await testClient.mainnet.mine({ blocks: 1 })
      await expect.poll(() => result.data).toEqual(blockNumber + 1n)

      await testClient.mainnet.mine({ blocks: 1 })
      await expect.poll(() => result.data).toEqual(blockNumber + 2n)
    },
    {},
    async () => {
      await testClient.mainnet.resetFork()
    },
  ),
)
