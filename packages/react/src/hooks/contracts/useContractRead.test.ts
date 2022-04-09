import { actHook, renderHook } from '../../../test'
import { useContractRead } from './useContractRead'

describe('useContractRead', () => {
  it('reads', async () => {
    const { result, waitFor } = renderHook(() =>
      useContractRead(
        {
          addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
          contractInterface: [
            {
              inputs: [{ internalType: 'address', name: '', type: 'address' }],
              name: 'love',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
        'love',
        {
          args: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        },
      ),
    )

    await waitFor(() => result.current.isSuccess)

    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": {
          "hex": "0x00",
          "type": "BigNumber",
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

  it('skips when enabled is falsy', () => {
    const { result } = renderHook(() =>
      useContractRead(
        {
          addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
          contractInterface: [
            {
              inputs: [{ internalType: 'address', name: '', type: 'address' }],
              name: 'love',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
        'love',
        {
          args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          enabled: false,
        },
      ),
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

  it('refetch', async () => {
    const { result, waitFor } = renderHook(() =>
      useContractRead(
        {
          addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
          contractInterface: [
            {
              inputs: [{ internalType: 'address', name: '', type: 'address' }],
              name: 'love',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
        'love',
        {
          args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          enabled: false,
        },
      ),
    )

    actHook(() => {
      result.current.refetch()
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": {
          "hex": "0x01",
          "type": "BigNumber",
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
