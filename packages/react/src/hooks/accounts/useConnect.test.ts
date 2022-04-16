import { MockConnector } from '@wagmi/core/connectors/mock'

import {
  actHook,
  getMockConnector,
  getSigners,
  queryClient,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { useConnect } from './useConnect'

describe('useConnect', () => {
  describe('on mount', () => {
    it('is not connected', () => {
      const { result } = renderHook(() => useConnect())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "activeConnector": undefined,
          "connect": [Function],
          "connectAsync": [Function],
          "connectors": [
            "<MockConnector>",
          ],
          "data": undefined,
          "error": null,
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isError": false,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": undefined,
          "reset": [Function],
          "status": "disconnected",
        }
      `)
    })
  })

  describe('config', () => {
    const connector = new MockConnector({
      options: {
        signer: getSigners()[0],
      },
    })
    describe('connector', () => {
      it('connects', async () => {
        const { result, waitFor } = renderHook(() => useConnect({ connector }))

        await actHook(async () => {
          result.current.connect()
        })

        await waitFor(() => result.current.isConnected)

        expect(result.current).toMatchInlineSnapshot(`
          {
            "activeConnector": "<MockConnector>",
            "connect": [Function],
            "connectAsync": [Function],
            "connectors": [
              "<MockConnector>",
            ],
            "data": {
              "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "chain": {
                "id": 1,
                "unsupported": false,
              },
              "connector": "<MockConnector>",
              "provider": "<MockProvider>",
            },
            "error": null,
            "isConnected": true,
            "isConnecting": false,
            "isDisconnected": false,
            "isError": false,
            "isIdle": false,
            "isReconnecting": false,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "connected",
          }
        `)
      })

      it('fails connect', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnect({
            connector: new MockConnector({
              options: {
                flags: {
                  failConnect: true,
                },
                signer: getSigners()[0],
              },
            }),
          }),
        )

        await actHook(async () => {
          result.current.connect()
        })

        await waitFor(() => result.current.isError)

        expect(result.current).toMatchInlineSnapshot(`
          {
            "activeConnector": undefined,
            "connect": [Function],
            "connectAsync": [Function],
            "connectors": [
              "<MockConnector>",
            ],
            "data": undefined,
            "error": [UserRejectedRequestError: User rejected request],
            "isConnected": false,
            "isConnecting": false,
            "isDisconnected": true,
            "isError": true,
            "isIdle": false,
            "isReconnecting": false,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "disconnected",
          }
        `)
      })
    })

    it('beforeConnect', async () => {
      const onBeforeConnect = jest.fn()
      const { result, waitFor } = renderHook(() =>
        useConnect({
          connector,
          onBeforeConnect,
        }),
      )

      await actHook(async () => {
        result.current.connect()
      })

      await waitFor(() => result.current.isConnected)

      expect(onBeforeConnect).toBeCalledWith({ connector })
    })

    it('onConnect', async () => {
      const onConnect = jest.fn()
      const { result, waitFor } = renderHook(() =>
        useConnect({
          connector,
          onConnect,
        }),
      )

      await actHook(async () => {
        result.current.connect()
      })

      await waitFor(() => result.current.isConnected)

      expect(onConnect).toBeCalledWith(
        result.current.data,
        { connector },
        undefined,
      )
    })
  })

  describe.skip('connect', () => {
    it('succeeds', async () => {
      const { result } = renderHook(() => useConnect())

      await actHook(async () => {
        const mockConnector = result.current.connectors[0]
        result.current.connect(mockConnector)
      })

      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": "<MockConnector>",
          "connect": [Function],
          "connectAsync": [Function],
          "data": {
            "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "chain": {
              "id": 1,
              "unsupported": false,
            },
            "connector": "<MockConnector>",
            "provider": "<MockProvider>",
          },
          "error": null,
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isError": false,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": "<MockConnector>",
          "status": "connected",
        }
      `)
    })

    it('succeeds with unsupported chain', async () => {
      const { result, waitFor } = renderHook(() => useConnect(), {
        wrapper,
        initialProps: {
          client: setupWagmiClient({
            connectors: [
              getMockConnector({
                network: 69,
                signer: getSigners()[0],
              }),
            ],
            queryClient,
          }),
        },
      })

      await actHook(async () => {
        const mockConnector = result.current.connectors[0]
        result.current.connect(mockConnector)
      })

      await waitFor(() => result.current.isConnected)

      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": "<MockConnector>",
          "connect": [Function],
          "connectAsync": [Function],
          "data": {
            "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "chain": {
              "id": 69,
              "unsupported": true,
            },
            "connector": "<MockConnector>",
            "provider": "<MockProvider>",
          },
          "error": null,
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isError": false,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": "<MockConnector>",
          "status": "connected",
        }
      `)
    })

    it('fails', async () => {
      const { result, waitFor } = renderHook(() => useConnect(), {
        wrapper,
        initialProps: {
          client: setupWagmiClient({
            connectors: [
              getMockConnector({
                flags: { failConnect: true },
                signer: getSigners()[0],
              }),
            ],
            queryClient,
          }),
        },
      })

      await actHook(async () => {
        const mockConnector = result.current.connectors[0]
        result.current.connect(mockConnector)
      })

      await waitFor(() => result.current.isError)

      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": undefined,
          "connect": [Function],
          "connectAsync": [Function],
          "data": undefined,
          "error": [UserRejectedRequestError: User rejected request],
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isError": true,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": "<MockConnector>",
          "status": "disconnected",
        }
      `)
    })

    it('already connected', async () => {
      const { result, waitFor } = renderHook(() => useConnect())

      await actHook(async () => {
        const mockConnector = result.current.connectors[0]
        result.current.connect(mockConnector)
      })

      await actHook(async () => {
        const mockConnector = result.current.connectors[0]
        result.current.connect(mockConnector)
      })

      await waitFor(() => result.current.isError)

      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": "<MockConnector>",
          "connect": [Function],
          "connectAsync": [Function],
          "data": undefined,
          "error": [ConnectorAlreadyConnectedError: Connector already connected],
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isError": true,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": "<MockConnector>",
          "status": "connected",
        }
      `)
    })
  })
})
