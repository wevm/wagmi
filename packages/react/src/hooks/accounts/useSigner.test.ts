import { actHook, renderHook } from '../../../test'
import { useSigner } from './useSigner'
import { useConnect } from './useConnect'

const useSignerWithConnect = () => {
  const signer = useSigner()
  const connect = useConnect()
  return { signer, connect } as const
}

describe('useSigner', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useSigner())
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

    it('connected', async () => {
      const { result } = renderHook(() => useSignerWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      expect(result.current.signer).toMatchInlineSnapshot(`
        {
          "data": JsonRpcSigner {
            "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "_index": null,
            "_isSigner": true,
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

  describe('getSigner', () => {
    it('connected', async () => {
      const { result } = renderHook(() => useSignerWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        const refetchResult = await result.current.signer.refetch()
        expect(refetchResult).toMatchInlineSnapshot(`
          {
            "data": JsonRpcSigner {
              "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "_index": null,
              "_isSigner": true,
              "provider": "<Provider network={31337} />",
            },
            "dataUpdatedAt": 1643673600000,
            "error": null,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "fetchStatus": "idle",
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": true,
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

    it('not connected', async () => {
      const { result } = renderHook(() => useSigner())

      await actHook(async () => {
        const refetchResult = await result.current.refetch()
        expect(refetchResult).toMatchInlineSnapshot(`
          {
            "data": null,
            "dataUpdatedAt": 1643673600000,
            "error": null,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "fetchStatus": "idle",
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": true,
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
  })
})
