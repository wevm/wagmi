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
          "dataUpdatedAt": 0,
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": true,
          "isIdle": false,
          "isLoading": true,
          "isLoadingError": false,
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

    it('connected', async () => {
      const { result, waitFor } = renderHook(() =>
        useBalanceWithConnect({
          balance: {
            addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          },
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        await result.current.connect.connect(mockConnector)
      })

      await waitFor(() => result.current.balance.isSuccess)

      const { dataUpdatedAt, ...res } = result.current.balance
      expect(dataUpdatedAt).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
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
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isLoadingError": false,
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

  it('skip', async () => {
    const { result } = renderHook(() =>
      useBalance({
        enabled: false,
        addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      }),
    )
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "dataUpdatedAt": 0,
        "error": null,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "isError": false,
        "isFetched": false,
        "isFetchedAfterMount": false,
        "isFetching": false,
        "isIdle": true,
        "isLoading": false,
        "isLoadingError": false,
        "isPlaceholderData": false,
        "isPreviousData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": true,
        "isSuccess": false,
        "refetch": [Function],
        "remove": [Function],
        "status": "idle",
      }
    `)
  })

  describe('getBalance', () => {
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
        await result.current.connect.connect(mockConnector)

        const { dataUpdatedAt, ...res } = await result.current.balance.refetch()
        expect(dataUpdatedAt).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
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
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isLoadingError": false,
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
        await result.current.connect.connect(mockConnector)

        const { errorUpdatedAt, ...res } =
          await result.current.balance.refetch()
        expect(errorUpdatedAt).toBeDefined
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "dataUpdatedAt": 0,
            "error": [Error: address is required],
            "failureCount": 1,
            "isError": true,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isLoadingError": true,
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
