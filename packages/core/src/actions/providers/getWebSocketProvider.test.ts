import { describe, expect, it } from 'vitest'

import {
  getWebSocketProvider as getWebSocketProvider_,
  setupClient,
} from '../../../test'
import { getWebSocketProvider } from './getWebSocketProvider'

describe('getWebSocketProvider', () => {
  it('default', async () => {
    setupClient({
      webSocketProvider: getWebSocketProvider_,
    })
    expect(getWebSocketProvider()).toMatchInlineSnapshot(
      '"<WebSocketProvider network={1} />"',
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      const webSocketProvider = getWebSocketProvider({ chainId: 1 })
      expect(webSocketProvider).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })
  })

  describe('behavior', () => {
    it('referentially equal', async () => {
      setupClient()
      expect(
        getWebSocketProvider({ chainId: 1 }) ===
          getWebSocketProvider({ chainId: 1 }),
      ).toBeTruthy()
    })
  })
})
