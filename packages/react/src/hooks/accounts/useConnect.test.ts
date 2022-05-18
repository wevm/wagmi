import { connect } from '@wagmi/core'
import { MockConnector } from '@wagmi/core/connectors/mock'

import { act, getSigners, renderHook, setupClient } from '../../../test'
import { UseConnectArgs, UseConnectConfig, useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
})

const connectorFail = new MockConnector({
  options: {
    flags: { failConnect: true },
    signer: getSigners()[0],
  },
})

function useConnectWithDisconnect(
  config: UseConnectArgs & UseConnectConfig = {},
) {
  return {
    connect: useConnect(config),
    disconnect: useDisconnect(),
  }
}

describe('useConnect', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const client = setupClient()
      await connect({ connector: client.connectors[0] })

      const { result, waitFor } = renderHook(() => useConnect(), {
        initialProps: { client },
      })
      await waitFor(() => expect(result.current.isConnected).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      expect(result.current).toMatchInlineSnapshot(`
        {
          "activeConnector": "<MockConnector>",
          "connect": [Function],
          "connectAsync": [Function],
          "connectors": [
            "<MockConnector>",
          ],
          "data": undefined,
          "error": null,
          "isConnected": true,
          "isConnecting": false,
          "isDisconnected": false,
          "isError": false,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": undefined,
          "reset": [Function],
          "status": "connected",
        }
      `)
    })

    it('is not connected', async () => {
      const { result, waitFor } = renderHook(() => useConnect())

      await waitFor(() => expect(result.current.isDisconnected).toBeTruthy())

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

  describe('configuration', () => {
    describe('connector', () => {
      it('connects', async () => {
        const { result, waitFor } = renderHook(() => useConnect({ connector }))

        await act(async () => result.current.connect())
        await waitFor(() => expect(result.current.isConnected).toBeTruthy())

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
            connector: connectorFail,
          }),
        )

        await act(async () => {
          result.current.connect()
        })
        await waitFor(() => expect(result.current.isError).toBeTruthy())

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

    it('onConnect', async () => {
      const onConnect = jest.fn()
      const { result, waitFor } = renderHook(() =>
        useConnect({ connector, onConnect }),
      )

      await act(async () => result.current.connect())
      await waitFor(() => expect(result.current.isConnected).toBeTruthy())

      expect(onConnect).toBeCalledWith(
        result.current.data,
        { connector },
        undefined,
      )
    })
  })

  describe('return value', () => {
    describe('connect', () => {
      it('uses configuration', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnect({
            connector,
          }),
        )

        await act(async () => result.current.connect())
        await waitFor(() => expect(result.current.isConnected).toBeTruthy())

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

      it('uses deferred args', async () => {
        const { result, waitFor } = renderHook(() => useConnect())

        await act(async () => {
          const mockConnector = result.current.connectors[0]
          result.current.connect(mockConnector)
        })
        await waitFor(() => expect(result.current.isConnected).toBeTruthy())

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

      it('fails', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnect({
            connector: connectorFail,
          }),
        )

        await act(async () => result.current.connect())
        await waitFor(() => expect(result.current.isError).toBeTruthy())

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

    describe('connectAsync', () => {
      it('uses configuration', async () => {
        const { result, waitFor } = renderHook(() => useConnect({ connector }))

        await act(async () => {
          const res = await result.current.connectAsync()
          expect(res).toMatchInlineSnapshot(`
            {
              "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "chain": {
                "id": 1,
                "unsupported": false,
              },
              "connector": "<MockConnector>",
              "provider": "<MockProvider>",
            }
          `)
        })

        await waitFor(() => result.current.isConnected)
      })

      it('throws error', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnect({ connector: connectorFail }),
        )

        await act(async () => {
          await expect(
            result.current.connectAsync(),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"User rejected request"`,
          )
        })

        await waitFor(() => expect(result.current.isError).toBeTruthy())
      })
    })
  })

  describe('behavior', () => {
    it('connects to unsupported chain', async () => {
      const { result, waitFor } = renderHook(() =>
        useConnect({
          connector: new MockConnector({
            options: {
              network: 69,
              signer: getSigners()[0],
            },
          }),
        }),
      )

      await act(async () => result.current.connect())
      await waitFor(() => result.current.isConnected)
      expect(result.current.data?.chain.unsupported).toBeTruthy()
    })

    it('is already connected', async () => {
      const { result, waitFor } = renderHook(() => useConnect())

      await act(async () => result.current.connect(connector))
      await waitFor(() => expect(result.current.isConnected).toBeTruthy())

      await act(async () => result.current.connect(connector))

      await waitFor(() => expect(result.current.isError).toBeTruthy())
      expect(result.current.error).toMatchInlineSnapshot(
        `[ConnectorAlreadyConnectedError: Connector already connected]`,
      )
    })

    it('updates on disconnect', async () => {
      const { result, waitFor } = renderHook(() =>
        useConnectWithDisconnect({ connector }),
      )

      await act(async () => result.current.connect.connect(connector))
      await waitFor(() =>
        expect(result.current.connect.isConnected).toBeTruthy(),
      )
      expect(result.current.connect).toMatchInlineSnapshot(`
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

      await act(async () => result.current.disconnect.disconnect())
      await waitFor(() =>
        expect(result.current.disconnect.isSuccess).toBeTruthy(),
      )
      expect(result.current.connect).toMatchInlineSnapshot(`
        {
          "activeConnector": undefined,
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
          "isConnected": false,
          "isConnecting": false,
          "isDisconnected": true,
          "isError": false,
          "isIdle": false,
          "isReconnecting": false,
          "pendingConnector": "<MockConnector>",
          "reset": [Function],
          "status": "disconnected",
        }
      `)
    })

    it('status lifecycle', async () => {
      const client = setupClient({ autoConnect: true })
      await connect({ connector: client.connectors[0] })

      const { result, waitFor } = renderHook(() => useConnect(), {
        initialProps: { client },
      })

      await waitFor(() => expect(result.current.isConnecting).toBeTruthy())
      expect(result.current.status).toMatchInlineSnapshot(`"connecting"`)
      await waitFor(() => expect(result.current.isConnected).toBeTruthy())
      expect(result.current.status).toMatchInlineSnapshot(`"connected"`)
    })
  })
})
