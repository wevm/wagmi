import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import { UseBalanceArgs, UseBalanceConfig, useBalance } from './useBalance'

const useBalanceWithConnect = (config: {
  balance: UseBalanceArgs & UseBalanceConfig
}) => {
  const balance = useBalance(config.balance)
  const connect = useConnect()
  return { balance, connect } as const
}

describe('useBalance', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() =>
        useBalance({
          addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        }),
      )
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "fetching",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": false,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": false,
          "isFetched": false,
          "isFetching": true,
          "isIdle": false,
          "isLoading": true,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)
    })

    it('connected', async () => {
      const { result, waitFor } = renderHook(() =>
        useBalanceWithConnect({
          balance: {
            addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          },
        }),
      )

      actHook(() => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await waitFor(() => result.current.balance.isSuccess)

      expect(result.current.balance).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "1.403416862768458662",
            "symbol": "ETH",
            "unit": "ether",
            "value": {
              "hex": "0x1379f033791b6ba6",
              "type": "BigNumber",
            },
          },
          "error": null,
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 1643673600000,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": true,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": false,
          "isFetched": true,
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

  it('enabled', async () => {
    const { result } = renderHook(() =>
      useBalance({
        enabled: false,
        addressOrName: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      }),
    )
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "fetchStatus": "idle",
        "internal": {
          "dataUpdatedAt": 0,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isFetchedAfterMount": false,
          "isLoadingError": false,
          "isPaused": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isStale": true,
          "remove": [Function],
        },
        "isError": false,
        "isFetched": false,
        "isFetching": false,
        "isIdle": true,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": false,
        "refetch": [Function],
        "status": "loading",
      }
    `)
  })

  describe('refetch', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useBalanceWithConnect({
          balance: {
            addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            enabled: false,
          },
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)

        const refetchResult = await result.current.balance.refetch()
        expect(refetchResult).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 18,
              "formatted": "1.403416862768458662",
              "symbol": "ETH",
              "unit": "ether",
              "value": {
                "hex": "0x1379f033791b6ba6",
                "type": "BigNumber",
              },
            },
            "dataUpdatedAt": 1643673600000,
            "error": null,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "fetchStatus": "idle",
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": false,
            "isFetching": false,
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

    it('has error', async () => {
      const { result } = renderHook(() =>
        useBalanceWithConnect({ balance: { enabled: false } }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)

        const { errorUpdatedAt, ...res } =
          await result.current.balance.refetch()
        expect(errorUpdatedAt).toBeDefined
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "dataUpdatedAt": 0,
            "error": [Error: address is required],
            "failureCount": 1,
            "fetchStatus": "idle",
            "isError": true,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isLoading": false,
            "isLoadingError": true,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isRefetching": false,
            "isStale": true,
            "isSuccess": false,
            "refetch": [Function],
            "remove": [Function],
            "status": "error",
          }
        `)
      })
    })
  })
})
