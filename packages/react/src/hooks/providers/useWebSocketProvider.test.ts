import { getWebSocketProvider, renderHook, setupClient } from '../../../test'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  it('mounts', async () => {
    const client = setupClient({
      webSocketProvider: getWebSocketProvider,
    })
    await client.webSocketProvider?.destroy()
    const { result } = renderHook(() => useWebSocketProvider(), {
      initialProps: { client },
    })
    expect(result.current).toMatchInlineSnapshot(
      `"<WebSocketProvider network={31337} />"`,
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const client = setupClient({
        webSocketProvider: getWebSocketProvider,
      })
      await client.webSocketProvider?.destroy()
      const { result } = renderHook(
        () => useWebSocketProvider({ chainId: 1 }),
        { initialProps: { client } },
      )
      await result.current?.destroy()
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })
  })
})
