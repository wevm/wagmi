import {
  getWebSocketProvider as getWebSocketProvider_,
  setupWagmiClient,
} from '../../../test'
import { getWebSocketProvider } from './getWebSocketProvider'

describe('getWebSocketProvider', () => {
  it('default', async () => {
    setupWagmiClient({ webSocketProvider: getWebSocketProvider_ })
    expect(getWebSocketProvider()).toMatchInlineSnapshot(
      `"<WebSocketProvider network={31337} />"`,
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      setupWagmiClient({ webSocketProvider: getWebSocketProvider_ })
      expect(getWebSocketProvider({ chainId: 1 })).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })
  })
})
