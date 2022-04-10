import {
  getWebSocketProvider,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  it('inits', async () => {
    const client = setupWagmiClient({
      webSocketProvider: getWebSocketProvider,
    })
    const { result } = renderHook(() => useWebSocketProvider(), {
      wrapper,
      initialProps: {
        client,
      },
    })
    expect(result.current).toMatchInlineSnapshot(
      `"<WebSocketProvider network={31337} />"`,
    )
    await client.webSocketProvider?.destroy()
  })

  it('chainId', async () => {
    const client = setupWagmiClient({
      webSocketProvider: getWebSocketProvider,
    })
    await client.webSocketProvider?.destroy()
    const { result } = renderHook(() => useWebSocketProvider({ chainId: 1 }), {
      wrapper,
      initialProps: {
        client,
      },
    })
    expect(result.current).toMatchInlineSnapshot(
      `"<WebSocketProvider network={1} />"`,
    )
  })
})
