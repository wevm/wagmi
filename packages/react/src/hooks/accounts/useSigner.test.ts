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
      const { result } = renderHook(() => useSignerWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      const { data, dataUpdatedAt, ...rest } = result.current.signer
      expect(data).toBeDefined()
      expect(dataUpdatedAt).toBeDefined()
      expect(rest).toMatchInlineSnapshot(`
        {
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

  describe('getSigner', () => {
    it('connected', async () => {
      const { result } = renderHook(() => useSignerWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
        const res = await result.current.signer.refetch()
        expect(res).toBeDefined()
      })
    })

    it('not connected', async () => {
      const { result } = renderHook(() => useSigner())

      await actHook(async () => {
        const res = await result.current.refetch()
        const { dataUpdatedAt, ...rest } = res
        expect(dataUpdatedAt).toBeDefined()
        expect(rest).toMatchInlineSnapshot(`
          {
            "data": undefined,
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
  })
})
