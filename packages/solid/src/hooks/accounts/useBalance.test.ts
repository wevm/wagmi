import { waitFor } from '@solidjs/testing-library'
import type { Address } from 'abitype'
import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useBalance } from './useBalance'

const chainId = () => 1
const address = (): Address => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'

describe('useBalance', () => {
  it('mounts', async () => {
    const { result } = renderHook(() =>
      useBalance({
        address,
      }),
    )

    await waitFor(() => expect(result.isSuccess).toBeTruthy())

    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "decimals": 18,
          "formatted": "0.40742480512617271",
          "symbol": "ETH",
          "value": {
            "hex": "0x05a776b39e3a7026",
            "type": "BigNumber",
          },
        },
        "dataUpdatedAt": 1643673600000,
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
        "isPlaceholderData": false,
        "isPreviousData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": true,
        "isSuccess": true,
        "refetch": [Function],
        "remove": [Function],
        "status": "success",
      }
    `)
  })

  describe('configuration', () => {
    it('address', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address,
          chainId,
        }),
      )

      await new Promise((resolve) => setTimeout(resolve, 1000))
      expect(result.isSuccess).toBeTruthy()

      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "0.40742480512617271",
            "symbol": "ETH",
            "value": {
              "hex": "0x05a776b39e3a7026",
              "type": "BigNumber",
            },
          },
          "dataUpdatedAt": 1643673600000,
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
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    })

    it('scopeKey', async () => {
      const { result } = renderHook(() => {
        return {
          balance: useBalance({
            address,
          }),
          balancewithoutScopeKey: useBalance({
            address,
            enabled: false,
          }),
          balancewithScopeKey: useBalance({
            address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() => expect(result.balance.isSuccess).toBeTruthy())
      await waitFor(() =>
        expect(result.balancewithoutScopeKey.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.balancewithScopeKey.isStale).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result } = renderHook(() =>
        useBalance({
          chainId,
          address,
        }),
      )

      await waitFor(() => expect(result.isSuccess).toBeTruthy())

      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "0.40742480512617271",
            "symbol": "ETH",
            "value": {
              "hex": "0x05a776b39e3a7026",
              "type": "BigNumber",
            },
          },
          "dataUpdatedAt": 1643673600000,
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
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": true,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    })

    it('enabled', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address,
          enabled: false,
        }),
      )

      expect(result.isStale).toBeTruthy()

      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "0.40742480512617271",
            "symbol": "ETH",
            "value": {
              "hex": "0x05a776b39e3a7026",
              "type": "BigNumber",
            },
          },
          "dataUpdatedAt": 1643673600000,
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
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": true,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    })

    it('formatUnits', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address,
          formatUnits: () => 'gwei',
        }),
      )

      await waitFor(() => expect(result.isSuccess).toBeTruthy())

      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "407424805.12617271",
            "symbol": "ETH",
            "value": {
              "hex": "0x05a776b39e3a7026",
              "type": "BigNumber",
            },
          },
          "dataUpdatedAt": 1643673600000,
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
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    })

    it('token', async () => {
      const ensTokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
      const { result } = renderHook(() =>
        useBalance({
          address,
          token: () => ensTokenAddress,
        }),
      )

      await waitFor(() => expect(result.isSuccess).toBeTruthy())

      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "445.85124391824564224",
            "symbol": "ENS",
            "value": {
              "hex": "0x182b6dd01f5d124000",
              "type": "BigNumber",
            },
          },
          "dataUpdatedAt": 1643673600000,
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
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    })
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useBalance({
          enabled: false,
          address,
        }),
      )

      const { data } = await result.refetch()

      expect(data).toMatchInlineSnapshot(`
        {
          "decimals": 18,
          "formatted": "0.40742480512617271",
          "symbol": "ETH",
          "value": {
            "hex": "0x05a776b39e3a7026",
            "type": "BigNumber",
          },
        }
      `)
    })
  })

  describe('behavior', () => {
    it('does nothing when `address` is missing', async () => {
      const { result } = renderHook(() => useBalance())

      expect(result.isStale).toBeTruthy()

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
          "isLoading": true,
          "isLoadingError": false,
          "isPaused": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": false,
          "refetch": [Function],
          "remove": [Function],
          "status": "loading",
        }
      `)
    })

    it('token', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address,
          token: () => '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        }),
      )

      await waitFor(() => expect(result.isSuccess).toBeTruthy())

      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 6,
            "formatted": "500.001",
            "symbol": "USDC",
            "value": {
              "hex": "0x1dcd68e8",
              "type": "BigNumber",
            },
          },
          "dataUpdatedAt": 1643673600000,
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
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    }, 10_000)
  })
})
