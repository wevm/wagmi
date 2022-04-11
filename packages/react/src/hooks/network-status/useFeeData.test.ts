import { renderHook } from '../../../test'
import { useFeeData } from './useFeeData'

describe('useFeeData', () => {
  describe('on mount', () => {
    it('fetches', async () => {
      const { result, waitFor } = renderHook(() => useFeeData())
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

      await waitFor(() => result.current.isFetched)

      const { data, ...res } = result.current
      expect(data).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
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
      useFeeData({ enabled: false, formatUnits: 'kwei' }),
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
})
