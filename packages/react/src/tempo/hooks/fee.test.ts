import { accounts, config, renderHook } from '@wagmi/test/tempo'
import type { Address } from 'viem'
import { describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import { useSetUserToken, useSetUserTokenSync, useUserToken } from './fee.js'

describe('useUserToken', () => {
  test('default', async () => {
    const { result, rerender } = await renderHook(
      (props) => useUserToken({ account: props?.account }),
      { initialProps: { account: undefined as Address | undefined } },
    )

    await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

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
        "isStale": false,
        "isSuccess": false,
        "queryKey": [
          "getUserToken",
          {
            "account": undefined,
            "chainId": 1337,
          },
        ],
        "refetch": [Function],
        "status": "pending",
      }
    `)

    rerender({ account: accounts[0].address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 10_000,
    })

    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": {
          "address": "0x20C0000000000000000000000000000000000001",
          "id": 1n,
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
          "getUserToken",
          {
            "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "chainId": 1337,
          },
        ],
        "refetch": [Function],
        "status": "success",
      }
    `)
  })
})

describe('useSetUserToken', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      setUserToken: useSetUserToken(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const hash = await result.current.setUserToken.mutateAsync({
      token: '0x20C0000000000000000000000000000000000001',
    })
    expect(hash).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.setUserToken.isSuccess).toBeTruthy(),
    )
  })
})

describe('useSetUserTokenSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      setUserToken: useSetUserTokenSync(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const data = await result.current.setUserToken.mutateAsync({
      token: '0x20C0000000000000000000000000000000000001',
    })
    expect(data).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.setUserToken.isSuccess).toBeTruthy(),
    )
  })
})
