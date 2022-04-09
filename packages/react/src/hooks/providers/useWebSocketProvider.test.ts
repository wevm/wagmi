import {
  getWebSocketProvider,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useWebSocketProvider(), {
      wrapper,
      initialProps: {
        client: setupWagmiClient({
          webSocketProvider: getWebSocketProvider,
        }),
      },
    })
    expect(result.current).toMatchInlineSnapshot(
      `"<WebSocketProvider network={31337} />"`,
    )
  })

  it('chainId', async () => {
    const { result } = renderHook(() => useWebSocketProvider({ chainId: 1 }), {
      wrapper,
      initialProps: {
        client: setupWagmiClient({
          webSocketProvider: getWebSocketProvider,
        }),
      },
    })
    expect(result.current).toMatchInlineSnapshot(
      `"<WebSocketProvider network={1} />"`,
    )
  })
})
