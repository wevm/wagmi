import { actHook, renderHook } from '../../../test'
import { UseAccountConfig, useAccount } from './useAccount'
import { useConnect } from './useConnect'

const useAccountWithConnect = (config: { account?: UseAccountConfig } = {}) => {
  const account = useAccount(config.account)
  const connect = useConnect()
  return { account, connect } as const
}

describe('useAccount', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useAccount())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "dataUpdatedAt": 0,
          "disconnect": [Function],
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
      const { result } = renderHook(() => useAccountWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        await result.current.connect.connect(mockConnector)
      })

      const { dataUpdatedAt, ...data } = result.current.account
      expect(dataUpdatedAt).toBeDefined()
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x555fbD6976904AB47bC225eCf44B76799996870b",
          },
          "disconnect": [Function],
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

    // it('fetches ens', async () => {
    //   const { result } = renderHook(() =>
    //     useAccountWithConnect({ account: { fetchEns: true } }),
    //   )

    //   await actHook(async () => {
    //     const mockConnector = result.current.connect[0].data.connectors[0]
    //     await result.current.connect[1](mockConnector)
    //   })

    //   const { data: { connector, ...restData } = {}, ...rest } =
    //     result.current.account[0]
    //   expect(connector).toBeDefined()
    //   expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
    //     {
    //       "data": {
    //         "address": "0x012363D61BDC53D0290A0f25e9C89F8257550FB8",
    //         "ens": undefined,
    //       },
    //       "error": undefined,
    //       "loading": false,
    //     }
    //   `)
    // })
  })

  it('disconnects', async () => {
    const { result } = renderHook(() => useAccountWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect.connectors[0]
      await result.current.connect.connect(mockConnector)
    })

    const { dataUpdatedAt, ...data } = result.current.account
    expect(dataUpdatedAt).toBeDefined()
    expect(data).toMatchInlineSnapshot(`
      {
        "data": {
          "address": "0x555fbD6976904AB47bC225eCf44B76799996870b",
        },
        "disconnect": [Function],
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

    actHook(() => {
      result.current.account.disconnect()
    })

    const { dataUpdatedAt: dataUpdatedAt2, ...data2 } = result.current.account
    expect(dataUpdatedAt2).toBeDefined()
    expect(data2).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "disconnect": [Function],
        "error": null,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
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
})
