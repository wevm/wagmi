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
    it('is not connected', async () => {
      const { result } = renderHook(() => useConnect())
      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": undefined,
          "connect": [Function],
          "connectAsync": [Function],
          "connector": undefined,
          "data": undefined,
          "error": null,
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isError": false,
          "isIdle": false,
          "isReconnecting": false,
          "status": "disconnected",
        }
      `)
    })
  })

  describe('connect', () => {
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
          "connector": "<MockConnector>",
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
          "status": "connected",
        }
      `)
    })

    it('succeeds with unsupported chain', async () => {
      const { result } = renderHook(() => useConnect(), {
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

      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": undefined,
          "connect": [Function],
          "connectAsync": [Function],
          "connector": "<MockConnector>",
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
          "status": "connected",
        }
      `)
    })

    it('fails', async () => {
      const { result } = renderHook(() => useConnect(), {
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

      const { connectors, ...data } = result.current
      expect(connectors.length).toEqual(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeConnector": undefined,
          "connect": [Function],
          "connectAsync": [Function],
          "connector": "<MockConnector>",
          "data": undefined,
          "error": [UserRejectedRequestError: User rejected request],
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isError": true,
          "isIdle": false,
          "isReconnecting": false,
          "status": "disconnected",
        }
      `)
    })

    it('already connected', async () => {
      const { result } = renderHook(() => useConnect())

      await actHook(async () => {
        const mockConnector = result.current.connectors[0]
        result.current.connect(mockConnector)
      })

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
          "connector": "<MockConnector>",
          "data": undefined,
          "error": [ConnectorAlreadyConnectedError: Connector already connected],
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isError": true,
          "isIdle": false,
          "isReconnecting": false,
          "status": "connected",
        }
      `)
    })
  })
})
