import { VoidSigner } from 'ethers'

import {
  actHook,
  getMockConnector,
  getProvider,
  queryClient,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { UseAccountArgs, UseAccountConfig, useAccount } from './useAccount'
import { useConnect } from './useConnect'

const useAccountWithConnect = (
  config: { account?: UseAccountArgs & UseAccountConfig } = {},
) => {
  const account = useAccount(config.account)
  const connect = useConnect()
  return { account, connect } as const
}

describe('useAccount', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAccount())
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

      await waitForNextUpdate()

      const { dataUpdatedAt, ...data } = result.current
      expect(dataUpdatedAt).toBeDefined()
      expect(data).toMatchInlineSnapshot(`
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

    it('connected', async () => {
      const { result } = renderHook(() => useAccountWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      const { dataUpdatedAt, ...data } = result.current.account
      expect(dataUpdatedAt).toBeDefined()
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
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

    describe('ens', () => {
      it('true', async () => {
        const { result, waitForNextUpdate } = renderHook(
          () => useAccountWithConnect({ account: { ens: true } }),
          {
            wrapper,
            initialProps: {
              client: setupWagmiClient({
                connectors: [
                  getMockConnector({
                    signer: new VoidSigner(
                      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                    ),
                  }),
                ],
                provider: getProvider(),
                queryClient,
              }),
            },
          },
        )

        await actHook(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            "connector": "<MockConnector>",
          }
        `)
        await waitForNextUpdate()
        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            "connector": "<MockConnector>",
          }
        `)
        await waitForNextUpdate()
        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": null,
              "name": "awkweb.eth",
            },
          }
        `)
      })

      it('name', async () => {
        const { result } = renderHook(
          () => useAccountWithConnect({ account: { ens: { name: true } } }),
          {
            wrapper,
            initialProps: {
              client: setupWagmiClient({
                connectors: [
                  getMockConnector({
                    signer: new VoidSigner(
                      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                    ),
                  }),
                ],
                provider: getProvider(),
                queryClient,
              }),
            },
          },
        )

        await actHook(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": null,
              "name": "awkweb.eth",
            },
          }
        `)
      })

      it('avatar', async () => {
        const { result } = renderHook(
          () => useAccountWithConnect({ account: { ens: { avatar: true } } }),
          {
            wrapper,
            initialProps: {
              client: setupWagmiClient({
                connectors: [
                  getMockConnector({
                    signer: new VoidSigner(
                      '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                    ),
                  }),
                ],
                provider: getProvider(),
                queryClient,
              }),
            },
          },
        )

        await actHook(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": null,
              "name": "awkweb.eth",
            },
          }
        `)
      })
    })
  })

  it('disconnects', async () => {
    const { result } = renderHook(() => useAccountWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect.connectors[0]
      result.current.connect.connect(mockConnector)
    })

    const { dataUpdatedAt, ...data } = result.current.account
    expect(dataUpdatedAt).toBeDefined()
    expect(data).toMatchInlineSnapshot(`
      {
        "data": {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
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
