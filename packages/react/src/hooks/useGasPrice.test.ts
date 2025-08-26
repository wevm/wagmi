import { chain, testClient } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useGasPrice } from './useGasPrice.js'

test('default', async () => {
  await testClient.mainnet.restart()

  await testClient.mainnet.setNextBlockBaseFeePerGas({
    baseFeePerGas: 2_000_000_000n,
  })
  await testClient.mainnet.mine({ blocks: 1 })

  const { result } = await renderHook(() => useGasPrice())

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
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
})

test.skip('parameters: chainId', async () => {
  await testClient.mainnet2.restart()

  await testClient.mainnet2.setNextBlockBaseFeePerGas({
    baseFeePerGas: 1_000_000_000n,
  })
  await testClient.mainnet2.mine({ blocks: 1 })

  const { result } = await renderHook(() =>
    useGasPrice({ chainId: chain.mainnet2.id }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
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
})
