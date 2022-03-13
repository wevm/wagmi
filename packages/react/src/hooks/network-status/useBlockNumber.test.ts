import { actHook, renderHook } from '../../../test'
import { useBlockNumber } from './useBlockNumber'

describe('useBlockNumber', () => {
  describe('on mount', () => {
    it('fetches', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useBlockNumber())
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
      await waitForNextUpdate()

      const { dataUpdatedAt, ...data } = result.current
      expect(dataUpdatedAt).toBeDefined()
      expect(data).toMatchInlineSnapshot(`
        {
          "data": 14297676,
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
    const { result } = renderHook(() => useBlockNumber({ enabled: false }))
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

  it('getBlockNumber', async () => {
    const { result } = renderHook(() => useBlockNumber({ enabled: false }))

    await actHook(async () => {
      await result.current.refetch()
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
  })
})
