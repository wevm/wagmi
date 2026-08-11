import { testClient } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { describe, expect, test, vi } from 'vitest'
import { useBlockNumber } from './useBlockNumber.js'

describe.sequential('useBlockNumber', () => {
  test('mounts', async () => {
    await testClient.mainnet.restart()

    const { result, cleanup } = renderPrimitive(() => useBlockNumber())

    await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

    // result is a proxy object (store in Solid)
    // so we spread it into a new object for snapshot testing
    expect({ ...result }).toMatchInlineSnapshot(`
    {
      "data": 23535880n,
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
    cleanup()
  })

  test('parameters: watch', async () => {
    await testClient.mainnet.restart()

    const { result, cleanup } = renderPrimitive(() =>
      useBlockNumber(() => ({ watch: { pollingInterval: 100 } })),
    )

    await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })
    const blockNumber = result.data!
    expect(result.data).toBeTypeOf('bigint')

    await testClient.mainnet.mine({ blocks: 1 })
    await vi.waitFor(
      () => {
        expect(result.data).toEqual(blockNumber + 1n)
      },
      { timeout: 10_000 },
    )

    await testClient.mainnet.mine({ blocks: 1 })
    await vi.waitFor(
      () => {
        expect(result.data).toEqual(blockNumber + 2n)
      },
      { timeout: 10_000 },
    )
    cleanup()
  })
})
