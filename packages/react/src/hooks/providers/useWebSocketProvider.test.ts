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

    it('switches chainId', async () => {
      const client = setupClient({
        webSocketProvider: getWebSocketProvider,
      })
      await client.webSocketProvider?.destroy()
      let chainId = 1
      const { result } = renderHook(() => useWebSocketProvider({ chainId }), {
        initialProps: { client },
      })
      await result.current?.destroy()
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
      chainId = 4
      await result.current?.destroy()
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })
  })
})
