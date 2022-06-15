import {
  act,
  actConnect,
  actDisconnect,
  renderHook,
  setupClient,
} from '../../../test'
import { UseAccountConfig, useAccount } from './useAccount'
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
