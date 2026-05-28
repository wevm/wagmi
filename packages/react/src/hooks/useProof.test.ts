import { createConfig } from '@wagmi/core'
import { chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Address } from 'viem'
import { custom } from 'viem'
import { expect, test, vi } from 'vitest'
import { useProof } from './useProof.js'

const proofResponse = {
  address: '0x4200000000000000000000000000000000000016',
  accountProof: ['0x1'],
  balance: '0x0',
  codeHash: `0x${'0'.repeat(64)}`,
  nonce: '0x0',
  storageHash: `0x${'0'.repeat(64)}`,
  storageProof: [
    {
      key: '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      proof: ['0x1'],
      value: '0x0',
    },
  ],
} as const

const config = createConfig({
  chains: [chain.mainnet],
  storage: null,
  transports: {
    [chain.mainnet.id]: custom({
      async request({ method }) {
        if (method === 'eth_getProof') return proofResponse
        if (method === 'eth_chainId')
          return `0x${chain.mainnet.id.toString(16)}`
        throw new Error(`Unexpected RPC method: ${method}`)
      },
    }),
  },
})

test('default', async () => {
  const { result } = await renderHook(() =>
    useProof({
      config,
      address: '0x4200000000000000000000000000000000000016',
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect({ ...result.current, data: null }).toMatchInlineSnapshot(`
    {
      "data": null,
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isEnabled": true,
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
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "chainId": 1,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  const { result, rerender } = await renderHook(
    (props) =>
      useProof({
        config,
        address: props?.address,
        storageKeys: [
          '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
        ],
      }),
    { initialProps: { address: undefined as Address | undefined } },
  )

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
      "isEnabled": false,
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
        "getProof",
        {
          "address": undefined,
          "chainId": 1,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
      "refetch": [Function],
      "status": "pending",
    }
  `)

  rerender({ address: '0x4200000000000000000000000000000000000016' })

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect({ ...result.current, data: null }).toMatchInlineSnapshot(`
    {
      "data": null,
      "dataUpdatedAt": 1675209600000,
      "error": null,
      "errorUpdateCount": 0,
      "errorUpdatedAt": 0,
      "failureCount": 0,
      "failureReason": null,
      "fetchStatus": "idle",
      "isEnabled": true,
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
        "getProof",
        {
          "address": "0x4200000000000000000000000000000000000016",
          "chainId": 1,
          "storageKeys": [
            "0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99",
          ],
        },
      ],
      "refetch": [Function],
      "status": "success",
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const { result } = await renderHook(() => useProof())

  await wait(100)
  await vi.waitFor(() => expect(result.current.isPending).toBeTruthy())
})
