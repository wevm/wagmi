import {
  getWebSocketProvider as getWebSocketProvider_,
  setupClient,
} from '../../../test'
import { getWebSocketProvider } from './getWebSocketProvider'

describe('getWebSocketProvider', () => {
  it('default', async () => {
    const client = setupClient({
      webSocketProvider: getWebSocketProvider_,
    })
    expect(getWebSocketProvider()).toMatchInlineSnapshot(
      `"<WebSocketProvider network={31337} />"`,
    )
    await client.webSocketProvider?.destroy()
  })

  describe('args', () => {
    it('chainId', async () => {
      const webSocketProvider = getWebSocketProvider({ chainId: 1 })
      expect(webSocketProvider).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
      await webSocketProvider?.destroy()
    })
  })
})
