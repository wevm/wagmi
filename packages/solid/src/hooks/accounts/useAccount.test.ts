import { waitFor } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'

import { renderHook } from '../../../test'
import type { UseAccountConfig } from './useAccount'
import { useAccount } from './useAccount'
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
      const {
        result: { account, connect },
      } = renderHook(() => useAccountWithConnectAndDisconnect())

      await connect.connectAsync()

      expect(account().isConnected).toBeTruthy()

      expect(account()).toMatchInlineSnapshot(`
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
      const { result } = renderHook(() => useAccount())

      expect(result().isDisconnected).toBeTruthy()

      expect(result()).toMatchInlineSnapshot(`
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
      const {
        result: { account, connect, disconnect },
      } = renderHook(() => useAccountWithConnectAndDisconnect())

      await connect.connectAsync()

      expect(account().isConnected).toBeTruthy()

      expect(account()).toMatchInlineSnapshot(`
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

      await disconnect.disconnectData.mutateAsync()

      expect(account().isDisconnected).toBeTruthy()

      expect(account()).toMatchInlineSnapshot(`
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
      const onConnect = vi.fn()
      const onDisconnect = vi.fn()

      const {
        result: { connect, disconnect, account },
      } = renderHook(() =>
        useAccountWithConnectAndDisconnect({
          onConnect,
          onDisconnect,
        }),
      )

      await connect.connectAsync()

      expect(onDisconnect).toBeCalledTimes(0)

      expect(onConnect).toBeCalledTimes(1)
      expect(onConnect).toBeCalledWith({
        address: account().address,
        connector: account().connector,
        isReconnected: false,
      })

      await disconnect.disconnectData.mutateAsync()
      await disconnect.disconnect()

      await waitFor(() => expect(account().isDisconnected).toBeTruthy())

      expect(onDisconnect).toBeCalledTimes(1)
      expect(onConnect).toBeCalledTimes(1)
    })

    it('status lifecycle', async () => {
      const {
        result: { account, connect },
      } = renderHook(() => useAccountWithConnectAndDisconnect())

      connect.connectAsync()

      await waitFor(() => expect(account().isConnecting).toBeTruthy())

      expect(account().status).toMatchInlineSnapshot(`"connecting"`)

      await waitFor(() => expect(account().isConnected).toBeTruthy())

      expect(account().status).toMatchInlineSnapshot(`"connected"`)
    })
  })
})
