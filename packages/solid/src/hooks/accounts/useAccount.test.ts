import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'

const useAccountWithConnectAndDisconnect = () => {
  return {
    account: useAccount(),
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

      await connect.connect()

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

      await connect.connect()

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

      await disconnect.disconnect()

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

    it('status lifecycle', async () => {
      const {
        result: { account, connect },
      } = renderHook(() => useAccountWithConnectAndDisconnect())

      const connectPromise = connect.connect({
        connector: connect.connectors[0],
      })

      expect(account().isConnecting).toBeTruthy()
      expect(account().status).toMatchInlineSnapshot(`"connecting"`)

      await connectPromise

      expect(account().isConnected).toBeTruthy()
      expect(account().status).toMatchInlineSnapshot(`"connected"`)
    })
  })
})
