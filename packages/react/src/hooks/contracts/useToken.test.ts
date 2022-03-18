import { actHook, renderHook } from '../../../test'
import { useToken } from './useToken'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

describe('useToken', () => {
  describe('on mount', () => {
    it('has token', async () => {
      const { result, waitFor } = renderHook(() =>
        useToken({
          address: uniContractAddress,
        }),
      )

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "dataUpdatedAt": 0,
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "getToken": [Function],
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

      await waitFor(() => result.current.isFetched)

      const { dataUpdatedAt, ...res } = result.current
      expect(dataUpdatedAt).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          },
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "getToken": [Function],
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

    it('bogus token', async () => {
      const { result, waitFor } = renderHook(() =>
        useToken({
          address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
        }),
      )

      await waitFor(() => result.current.isFetched)

      const { errorUpdatedAt, ...res } = result.current
      expect(errorUpdatedAt).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "dataUpdatedAt": 0,
          "error": [Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="symbol()", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.5.0)],
          "failureCount": 1,
          "getToken": [Function],
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

  it('skip', async () => {
    const { result } = renderHook(() => useToken({ enabled: false }))
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "dataUpdatedAt": 0,
        "error": null,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "getToken": [Function],
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

  describe('refetch', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useToken({ address: uniContractAddress, enabled: false }),
      )

      await actHook(async () => {
        await result.current.refetch()
      })

      const { dataUpdatedAt, ...res } = result.current
      expect(dataUpdatedAt).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          },
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "getToken": [Function],
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

  describe('getToken', () => {
    it('uses params', async () => {
      const { result, waitFor } = renderHook(() => useToken({ enabled: false }))

      await actHook(async () => {
        result.current.getToken({
          address: uniContractAddress,
        })
      })

      await waitFor(() => result.current.isFetched)

      const { dataUpdatedAt, ...res } = result.current
      expect(dataUpdatedAt).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          },
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "getToken": [Function],
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
