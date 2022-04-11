import { renderHook } from '../../../test'
import { useEnsResolver } from './useEnsResolver'

describe('useEnsResolver', () => {
  describe('name', () => {
    it('has resolver', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsResolver({
          name: 'awkweb.eth',
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

      await waitFor(() => result.current.isSuccess)

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": Resolver {
            "_resolvedAddress": undefined,
            "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
            "name": "awkweb.eth",
            "provider": "<Provider network={31337} />",
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
            "isStale": false,
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

    it('does not have resolver', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsResolver({
          name: 'awkweb123.eth',
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

      await waitFor(() => result.current.isSuccess)

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": null,
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
            "isStale": false,
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

  describe('enabled', () => {
    it('is false', () => {
      const { result } = renderHook(() =>
        useEnsResolver({
          name: 'moxey.eth',
          enabled: false,
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

    it('missing name', () => {
      const { result } = renderHook(() => useEnsResolver({}))
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
})
