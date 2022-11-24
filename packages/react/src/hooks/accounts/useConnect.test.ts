import { MockConnector } from '@wagmi/core/connectors/mock'
import { describe, expect, it, vi } from 'vitest'

import { act, getSigners, renderHook, useAccount } from '../../../test'
import type { UseConnectArgs, UseConnectConfig } from './useConnect'
import { useConnect } from './useConnect'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

const connectorFail = new MockConnector({
  options: {
    flags: { failConnect: true },
    signer: getSigners()[0]!,
  },
})

function useConnectWithAccount(config: UseConnectArgs & UseConnectConfig = {}) {
  return {
    account: useAccount(),
    connect: useConnect(config),
  }
}

describe('useConnect', () => {
  describe('configuration', () => {
    describe('connector', () => {
      it('connects', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnectWithAccount({ connector }),
        )

        await act(async () => result.current.connect.connect())
        await waitFor(() =>
          expect(
            result.current.connect.isSuccess &&
              result.current.account.isConnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
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
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "success",
            "variables": {
              "chainId": undefined,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
            "isConnected": true,
            "isConnecting": false,
            "isDisconnected": false,
            "isReconnecting": false,
            "status": "connected",
          }
        `)
      })

      it('fails connect', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnectWithAccount({
            connector: connectorFail,
          }),
        )

        await act(async () => {
          result.current.connect.connect()
        })
        await waitFor(() =>
          expect(
            result.current.connect.isError &&
              result.current.account.isDisconnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
            "connect": [Function],
            "connectAsync": [Function],
            "connectors": [
              "<MockConnector>",
            ],
            "data": undefined,
            "error": [UserRejectedRequestError: User rejected request],
            "isError": true,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": false,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "error",
            "variables": {
              "chainId": undefined,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": undefined,
            "connector": undefined,
            "isConnected": false,
            "isConnecting": false,
            "isDisconnected": true,
            "isReconnecting": false,
            "status": "disconnected",
          }
        `)
      })
    })

    it('onSuccess', async () => {
      const onSuccess = vi.fn()
      const { result, waitFor } = renderHook(() =>
        useConnect({ connector, onSuccess }),
      )

      await act(async () => result.current.connect())
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      expect(onSuccess).toBeCalledWith(
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
          useConnectWithAccount({
            connector,
          }),
        )

        await act(async () => result.current.connect.connect())
        await waitFor(() =>
          expect(
            result.current.connect.isSuccess &&
              result.current.account.isConnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
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
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "success",
            "variables": {
              "chainId": undefined,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
            "isConnected": true,
            "isConnecting": false,
            "isDisconnected": false,
            "isReconnecting": false,
            "status": "connected",
          }
        `)
      })

      it('uses deferred args', async () => {
        const { result, waitFor } = renderHook(() => useConnectWithAccount())

        await act(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect({ connector: mockConnector })
        })
        await waitFor(() =>
          expect(
            result.current.connect.isSuccess &&
              result.current.account.isConnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
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
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "success",
            "variables": {
              "chainId": undefined,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
            "isConnected": true,
            "isConnecting": false,
            "isDisconnected": false,
            "isReconnecting": false,
            "status": "connected",
          }
        `)
      })

      it('connects to unsupported chain', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnectWithAccount({ connector }),
        )

        await act(async () => {
          result.current.connect.connect({ chainId: 69 })
        })

        await waitFor(() =>
          expect(
            result.current.connect.isSuccess &&
              result.current.account.isConnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
            "connect": [Function],
            "connectAsync": [Function],
            "connectors": [
              "<MockConnector>",
            ],
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
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "success",
            "variables": {
              "chainId": 69,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
            "isConnected": true,
            "isConnecting": false,
            "isDisconnected": false,
            "isReconnecting": false,
            "status": "connected",
          }
        `)
      })

      it('connects to supported chain', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnectWithAccount({ connector }),
        )

        await act(async () => {
          result.current.connect.connect({ chainId: 5 })
        })

        await waitFor(() =>
          expect(
            result.current.connect.isSuccess &&
              result.current.account.isConnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
            "connect": [Function],
            "connectAsync": [Function],
            "connectors": [
              "<MockConnector>",
            ],
            "data": {
              "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "chain": {
                "id": 5,
                "unsupported": false,
              },
              "connector": "<MockConnector>",
              "provider": "<MockProvider>",
            },
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "success",
            "variables": {
              "chainId": 5,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
            "isConnected": true,
            "isConnecting": false,
            "isDisconnected": false,
            "isReconnecting": false,
            "status": "connected",
          }
        `)
      })

      it('fails', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnectWithAccount({
            connector: connectorFail,
          }),
        )

        await act(async () => result.current.connect.connect())
        await waitFor(() =>
          expect(
            result.current.connect.isError &&
              result.current.account.isDisconnected,
          ).toBeTruthy(),
        )

        expect(result.current.connect).toMatchInlineSnapshot(`
          {
            "connect": [Function],
            "connectAsync": [Function],
            "connectors": [
              "<MockConnector>",
            ],
            "data": undefined,
            "error": [UserRejectedRequestError: User rejected request],
            "isError": true,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": false,
            "pendingConnector": "<MockConnector>",
            "reset": [Function],
            "status": "error",
            "variables": {
              "chainId": undefined,
              "connector": "<MockConnector>",
            },
          }
        `)
        expect(result.current.account).toMatchInlineSnapshot(`
          {
            "address": undefined,
            "connector": undefined,
            "isConnected": false,
            "isConnecting": false,
            "isDisconnected": true,
            "isReconnecting": false,
            "status": "disconnected",
          }
        `)
      })
    })

    describe('connectAsync', () => {
      it('uses configuration', async () => {
        const { result, waitFor } = renderHook(() =>
          useConnectWithAccount({ connector }),
        )

        await act(async () => {
          const res = await result.current.connect.connectAsync()
          expect(res).toMatchInlineSnapshot(`
            {
              "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "chain": {
                "id": 5,
                "unsupported": false,
              },
              "connector": "<MockConnector>",
              "provider": "<MockProvider>",
            }
          `)
        })

        await waitFor(() =>
          expect(
            result.current.connect.isSuccess &&
              result.current.account.isConnected,
          ).toBeTruthy(),
        )
      })

      it('uses deferred args', async () => {
        const { result } = renderHook(() => useConnectWithAccount())

        await act(async () => {
          const mockConnector = result.current.connect.connectors[0]
          const res = await result.current.connect.connectAsync({
            connector: mockConnector,
          })
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
      })

      it('connects to unsupported chain', async () => {
        const { result, waitFor } = renderHook(() => useConnect({ connector }))

        await act(async () => {
          const res = await result.current.connectAsync({ chainId: 69 })
          expect(res).toMatchInlineSnapshot(`
            {
              "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "chain": {
                "id": 69,
                "unsupported": true,
              },
              "connector": "<MockConnector>",
              "provider": "<MockProvider>",
            }
          `)
        })

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
      })

      it('connects to supported chain', async () => {
        const { result, waitFor } = renderHook(() => useConnect({ connector }))

        await act(async () => {
          const res = await result.current.connectAsync({ chainId: 5 })
          expect(res).toMatchInlineSnapshot(`
            {
              "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
              "chain": {
                "id": 5,
                "unsupported": false,
              },
              "connector": "<MockConnector>",
              "provider": "<MockProvider>",
            }
          `)
        })

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
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
          chainId: 69,
          connector: new MockConnector({
            options: {
              signer: getSigners()[0]!,
            },
          }),
        }),
      )

      await act(async () => result.current.connect())
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
      expect(result.current.data?.chain).toMatchInlineSnapshot(`
        {
          "id": 69,
          "unsupported": true,
        }
      `)
    })

    it('connects to a supported chain', async () => {
      const { result, waitFor } = renderHook(() =>
        useConnect({
          chainId: 5,
          connector: new MockConnector({
            options: {
              signer: getSigners()[0]!,
            },
          }),
        }),
      )

      await act(async () => result.current.connect())
      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
      expect(result.current.data?.chain).toMatchInlineSnapshot(`
        {
          "id": 5,
          "unsupported": false,
        }
      `)
    })
  })
})
