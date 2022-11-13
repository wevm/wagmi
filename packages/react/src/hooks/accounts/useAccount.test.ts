import { describe, expect, it, vi } from 'vitest'

import {
  act,
  actConnect,
  actDisconnect,
  renderHook,
  setupClient,
  useAccount,
} from '../../../test'
import type { UseAccountConfig } from './useAccount'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'

function useAccountWithConnectAndDisconnect(config: UseAccountConfig = {}) {
  return {
    account: useAccount(config),
    connect: useConnect(),
    disconnect: useDisconnect(),
  }
}

describe('useAccount', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const utils = renderHook(() => useAccountWithConnectAndDisconnect())
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() =>
        expect(result.current.account.isConnected).toBeTruthy(),
      )

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

    it('is not connected', async () => {
      const client = setupClient()
      const { result, waitFor } = renderHook(() => useAccount(), {
        initialProps: { client },
      })

      await waitFor(() => expect(result.current.isDisconnected).toBeTruthy())

      expect(result.current).toMatchInlineSnapshot(`
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

  describe('behavior', () => {
    it('updates on connect and disconnect', async () => {
      const utils = renderHook(() => useAccountWithConnectAndDisconnect())
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() =>
        expect(result.current.account.isConnected).toBeTruthy(),
      )
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

      await actDisconnect({ utils })

      await waitFor(() =>
        expect(result.current.account.isDisconnected).toBeTruthy(),
      )
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

    it('invokes callbacks on connect and disconnect', async () => {
      const connectListener = vi.fn()
      const disconnectListener = vi.fn()
      const utils = renderHook(() =>
        useAccountWithConnectAndDisconnect({
          onConnect: connectListener,
          onDisconnect: disconnectListener,
        }),
      )
      const { result } = utils

      await actConnect({ utils })

      const { address, connector } = result.current.account
      expect(disconnectListener).toBeCalledTimes(0)
      expect(connectListener).toBeCalledTimes(1)
      expect(connectListener).toBeCalledWith({
        address,
        connector,
        isReconnected: false,
      })

      await actDisconnect({ utils })

      expect(disconnectListener).toBeCalledTimes(1)
      expect(connectListener).toBeCalledTimes(1)
    })

    it('status lifecycle', async () => {
      const client = setupClient({ autoConnect: true })

      const { result, waitFor } = renderHook(
        () => useAccountWithConnectAndDisconnect(),
        {
          initialProps: { client },
        },
      )

      await act(async () => {
        result.current.connect.connect({
          connector: result.current.connect.connectors[0],
        })
      })

      await waitFor(() =>
        expect(result.current.account.isConnecting).toBeTruthy(),
      )
      expect(result.current.account.status).toMatchInlineSnapshot(
        `"connecting"`,
      )
      await waitFor(() =>
        expect(result.current.account.isConnected).toBeTruthy(),
      )
      expect(result.current.account.status).toMatchInlineSnapshot(`"connected"`)
    })
  })
})
