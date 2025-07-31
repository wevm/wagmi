import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useToken } from './useToken.js'

test('default', async () => {
  const { result } = await renderHook(() =>
    useToken({
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current).toMatchInlineSnapshot(`
    {
      "data": {
        "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        "decimals": 18,
        "name": "Uniswap",
        "symbol": "UNI",
        "totalSupply": {
          "formatted": "1000000000",
          "value": 1000000000000000000000000000n,
        },
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
        "token",
        {
          "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
          "chainId": 1,
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})
