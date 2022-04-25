import {
  getWebSocketProvider,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  it('mounts', async () => {
    const client = setupWagmiClient({
      webSocketProvider: getWebSocketProvider,
    })
    await client.webSocketProvider?.destroy()
    const { result } = renderHook(() => useWebSocketProvider(), {
      wrapper,
      initialProps: { client },
    })
    expect(result.current).toMatchInlineSnapshot(
      `"<WebSocketProvider network={31337} />"`,
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const client = setupWagmiClient({
        webSocketProvider: getWebSocketProvider,
      })
      await client.webSocketProvider?.destroy()
      const { result } = renderHook(
        () => useWebSocketProvider({ chainId: 1 }),
        {
          wrapper,
          initialProps: { client },
        },
      )
      await result.current?.destroy()
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })
  })
})
