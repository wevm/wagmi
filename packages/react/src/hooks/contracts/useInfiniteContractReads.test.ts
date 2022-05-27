import { act, renderHook } from '../../../test'
import {
  UseInfiniteContractReadsArgs,
  useInfiniteContractReads,
} from './useInfiniteContractReads'

const wagmigotchiContractConfig = {
  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  contractInterface: [
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'love',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAlive',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

const mlootContractConfig = {
  addressOrName: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  contractInterface: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

const contracts: UseInfiniteContractReadsArgs = [
  {
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
  },
  {
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  },
  { ...wagmigotchiContractConfig, functionName: 'getAlive' },
  {
    ...mlootContractConfig,
    functionName: 'tokenOfOwnerByIndex',
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
  },
]

describe('useContractRead', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useInfiniteContractReads(contracts),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "pageParams": [
            undefined,
          ],
          "pages": [
            [
              {
                "hex": "0x02",
                "type": "BigNumber",
              },
              {
                "hex": "0x01",
                "type": "BigNumber",
              },
              false,
              {
                "hex": "0x05a6db",
                "type": "BigNumber",
              },
            ],
          ],
        },
        "error": null,
        "fetchNextPage": [Function],
        "fetchPreviousPage": [Function],
        "fetchStatus": "idle",
        "hasNextPage": undefined,
        "hasPreviousPage": undefined,
        "isError": false,
        "isFetched": true,
        "isFetching": false,
        "isFetchingNextPage": false,
        "isFetchingPreviousPage": false,
        "isIdle": false,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `)
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useInfiniteContractReads(contracts, { chainId: 1 }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "pageParams": [
              undefined,
            ],
            "pages": [
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
                {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
                false,
                {
                  "hex": "0x05a6db",
                  "type": "BigNumber",
                },
              ],
            ],
          },
          "error": null,
          "fetchNextPage": [Function],
          "fetchPreviousPage": [Function],
          "fetchStatus": "idle",
          "hasNextPage": undefined,
          "hasPreviousPage": undefined,
          "isError": false,
          "isFetched": true,
          "isFetching": false,
          "isFetchingNextPage": false,
          "isFetchingPreviousPage": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() =>
        useInfiniteContractReads(contracts, { enabled: false }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchNextPage": [Function],
          "fetchPreviousPage": [Function],
          "fetchStatus": "idle",
          "hasNextPage": undefined,
          "hasPreviousPage": undefined,
          "isError": false,
          "isFetched": false,
          "isFetching": false,
          "isFetchingNextPage": false,
          "isFetchingPreviousPage": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })

    it('getNextPageParam', async () => {
      const { result, waitFor } = renderHook(() =>
        useInfiniteContractReads(contracts, {
          getNextPageParam: () => [contracts[0]],
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "pageParams": [
              undefined,
            ],
            "pages": [
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
                {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
                false,
                {
                  "hex": "0x05a6db",
                  "type": "BigNumber",
                },
              ],
            ],
          },
          "error": null,
          "fetchNextPage": [Function],
          "fetchPreviousPage": [Function],
          "fetchStatus": "idle",
          "hasNextPage": true,
          "hasPreviousPage": undefined,
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
          "isFetchingNextPage": false,
          "isFetchingPreviousPage": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)

      await act(async () => {
        await result.current.fetchNextPage()
      })

      await waitFor(() =>
        expect(result.current.fetchStatus === 'idle').toBeTruthy(),
      )

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "pageParams": [
              undefined,
              [
                {
                  "addressOrName": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
                  "args": "0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c",
                  "contractInterface": [
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address",
                        },
                      ],
                      "name": "love",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256",
                        },
                      ],
                      "stateMutability": "view",
                      "type": "function",
                    },
                    {
                      "inputs": [],
                      "name": "getAlive",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool",
                        },
                      ],
                      "stateMutability": "view",
                      "type": "function",
                    },
                  ],
                  "functionName": "love",
                },
              ],
            ],
            "pages": [
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
                {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
                false,
                {
                  "hex": "0x05a6db",
                  "type": "BigNumber",
                },
              ],
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
              ],
            ],
          },
          "error": null,
          "fetchNextPage": [Function],
          "fetchPreviousPage": [Function],
          "fetchStatus": "idle",
          "hasNextPage": true,
          "hasPreviousPage": undefined,
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
          "isFetchingNextPage": false,
          "isFetchingPreviousPage": false,
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

  describe('return value', () => {
    it('fetchNextPage', async () => {
      const { result, waitFor } = renderHook(() =>
        useInfiniteContractReads(contracts),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "pageParams": [
              undefined,
            ],
            "pages": [
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
                {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
                false,
                {
                  "hex": "0x05a6db",
                  "type": "BigNumber",
                },
              ],
            ],
          },
          "error": null,
          "fetchNextPage": [Function],
          "fetchPreviousPage": [Function],
          "fetchStatus": "idle",
          "hasNextPage": undefined,
          "hasPreviousPage": undefined,
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
          "isFetchingNextPage": false,
          "isFetchingPreviousPage": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)

      await act(async () => {
        await result.current.fetchNextPage({ pageParam: [contracts[0]] })
      })

      await waitFor(() =>
        expect(result.current.fetchStatus === 'idle').toBeTruthy(),
      )

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": {
            "pageParams": [
              undefined,
              [
                {
                  "addressOrName": "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
                  "args": "0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c",
                  "contractInterface": [
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address",
                        },
                      ],
                      "name": "love",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256",
                        },
                      ],
                      "stateMutability": "view",
                      "type": "function",
                    },
                    {
                      "inputs": [],
                      "name": "getAlive",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool",
                        },
                      ],
                      "stateMutability": "view",
                      "type": "function",
                    },
                  ],
                  "functionName": "love",
                },
              ],
            ],
            "pages": [
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
                {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
                false,
                {
                  "hex": "0x05a6db",
                  "type": "BigNumber",
                },
              ],
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
              ],
            ],
          },
          "error": null,
          "fetchNextPage": [Function],
          "fetchPreviousPage": [Function],
          "fetchStatus": "idle",
          "hasNextPage": undefined,
          "hasPreviousPage": undefined,
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
          "isFetchingNextPage": false,
          "isFetchingPreviousPage": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('refetch', async () => {
      const { result } = renderHook(() =>
        useInfiniteContractReads(contracts, { enabled: false }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          {
            "pageParams": [
              undefined,
            ],
            "pages": [
              [
                {
                  "hex": "0x02",
                  "type": "BigNumber",
                },
                {
                  "hex": "0x01",
                  "type": "BigNumber",
                },
                false,
                {
                  "hex": "0x05a6db",
                  "type": "BigNumber",
                },
              ],
            ],
          }
        `)
      })
    })
  })
})
