import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useBalance } from './useBalance'

describe('useBalance', () => {
  it('mounts', async () => {
    const {
      result: { balanceData, fetchBalance },
    } = renderHook(() =>
      useBalance({
        address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      }),
    )

    await fetchBalance()

    expect(balanceData().isSuccess).toBeTruthy()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = balanceData()
    expect(res).toMatchInlineSnapshot(`
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
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
        "isFetching": false,
        "isIdle": false,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `)
  })

  describe('configuration', () => {
    it('address', async () => {
      const {
        result: { balanceData, fetchBalance },
      } = renderHook(() =>
        useBalance({
          address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        }),
      )

      await fetchBalance()

      expect(balanceData().isSuccess).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = balanceData()
      expect(res).toMatchInlineSnapshot(`
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
            "error": null,
            "fetchStatus": "idle",
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isRefetching": false,
            "isSuccess": true,
            "refetch": [Function],
            "status": "success",
          }
        `)
    })

    it('scopeKey', async () => {
      const { result } = renderHook(() => {
        return {
          balance: useBalance({
            address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          }),
          balancewithoutScopeKey: useBalance({
            address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            enabled: false,
          }),
          balancewithScopeKey: useBalance({
            address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      expect(result().balance.isSuccess).toBeTruthy()
      expect(result().balancewithoutScopeKey.isSuccess).toBeTruthy()
      expect(result().balancewithScopeKey.isIdle).toBeTruthy()
    })

    it('chainId', async () => {
      const { result } = renderHook(() =>
        useBalance({
          chainId: () => 1,
          address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        }),
      )

      expect(result().isSuccess).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result()
      expect(res).toMatchInlineSnapshot(`
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
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('enabled', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address: () => '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac',
          enabled: false,
        }),
      )

      expect(result().isIdle).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })

    it('formatUnits', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          formatUnits: () => 'gwei',
        }),
      )

      expect(result().isSuccess).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result()
      expect(res).toMatchInlineSnapshot(`
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
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('token', async () => {
      const ensTokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
      const { result } = renderHook(() =>
        useBalance({
          address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          token: () => ensTokenAddress,
        }),
      )

      expect(result().isSuccess).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result()
      expect(res).toMatchInlineSnapshot(`
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
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
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
          address: () => '0xfb843f8c4992efdb6b42349c35f025ca55742d33',
        }),
      )

      const { data } = await result().refetch()
      expect(data).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "0.024495190284783363",
            "symbol": "ETH",
            "value": {
              "hex": "0x57063eeba14f03",
              "type": "BigNumber",
            },
          }
        `)
    })
  })

  describe('behavior', () => {
    it('does nothing when `address` is missing', async () => {
      const { result } = renderHook(() => useBalance())

      expect(result().isIdle).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })

    it('token', async () => {
      const { result } = renderHook(() =>
        useBalance({
          address: () => '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          token: () => '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        }),
      )

      expect(result.current.isSuccess).toBeTruthy()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result()
      expect(res).toMatchInlineSnapshot(`
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
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    }, 10_000)
  })
})
