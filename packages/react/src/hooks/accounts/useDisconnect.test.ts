import { actHook, renderHook } from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'

const useDisconnectWithConnect = () => {
  const connect = useConnect()
  const disconnect = useDisconnect()
  return { connect, disconnect } as const
}

const useDisconnectWithAccountAndConnect = () => {
  const account = useAccount()
  const connect = useConnect()
  const disconnect = useDisconnect()
  return { account, connect, disconnect } as const
}

describe('useDisconnect', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useDisconnect())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "status": "idle",
        }
      `)
    })
  })

  describe('disconnect', () => {
    it('succeeds', async () => {
      const { result, waitFor } = renderHook(() => useDisconnectWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      expect(result.current.connect.activeConnector).toMatchInlineSnapshot(
        `"<MockConnector>"`,
      )
      expect(result.current.disconnect).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "status": "idle",
        }
      `)

      await actHook(async () => {
        result.current.disconnect.disconnect()
      })

      await waitFor(() => result.current.disconnect.isSuccess)
      expect(result.current.connect.activeConnector).toMatchInlineSnapshot(
        `undefined`,
      )
      expect(result.current.disconnect).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "status": "success",
        }
      `)
    })
  })

  it('clears account cache', async () => {
    const { result, waitFor } = renderHook(() =>
      useDisconnectWithAccountAndConnect(),
    )

    await actHook(async () => {
      const mockConnector = result.current.connect.connectors[0]
      result.current.connect.connect(mockConnector)
    })

    expect(result.current.account.data).toMatchInlineSnapshot(`
      {
        "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "connector": "<MockConnector>",
      }
    `)

    await actHook(async () => {
      result.current.disconnect.disconnect()
    })

    await waitFor(() => result.current.disconnect.isSuccess)
    expect(result.current.account.data).toMatchInlineSnapshot(`null`)
  })
})
