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

    const { dataUpdatedAt, ...res } = result.current
    expect(dataUpdatedAt).toBeDefined()
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "hex": "0x00",
          "type": "BigNumber",
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
        "read": [Function],
        "refetch": [Function],
        "remove": [Function],
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
        "read": [Function],
        "refetch": [Function],
        "remove": [Function],
        "status": "idle",
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

    const { dataUpdatedAt, ...res } = result.current
    expect(dataUpdatedAt).toBeDefined()
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "hex": "0x01",
          "type": "BigNumber",
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
        "read": [Function],
        "refetch": [Function],
        "remove": [Function],
        "status": "success",
      }
    `)
  })

  it('read', async () => {
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
      ),
    )

    actHook(() => {
      result.current.read({
        args: '0xf2018d6E6552Ff50f37583F48F905f1231E14bD1',
      })
    })

    await waitFor(() => result.current.isSuccess)

    const { dataUpdatedAt, ...res } = result.current
    expect(dataUpdatedAt).toBeDefined()
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "hex": "0x00",
          "type": "BigNumber",
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
        "read": [Function],
        "refetch": [Function],
        "remove": [Function],
        "status": "success",
      }
    `)
  })
})
