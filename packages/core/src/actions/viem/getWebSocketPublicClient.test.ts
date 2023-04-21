import { describe, expect, it } from 'vitest'

import {
  getWebSocketPublicClient as getWebSocketPublicClient_,
  setupClient,
} from '../../../test'
import { getWebSocketPublicClient } from './getWebSocketPublicClient'

describe('getWebSocketPublicClient', () => {
  it('default', async () => {
    setupClient({
      webSocketPublicClient: getWebSocketPublicClient_,
    })
    expect(getWebSocketPublicClient()).toMatchInlineSnapshot(
      '"<WebSocketPublicClient network={1} />"',
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      const webSocketPublicClient = getWebSocketPublicClient({ chainId: 1 })
      expect(webSocketPublicClient).toMatchInlineSnapshot(
        `"<WebSocketPublicClient network={1} />"`,
      )
    })
  })

  describe('behavior', () => {
    it('referentially equal', async () => {
      setupClient()
      expect(
        getWebSocketPublicClient({ chainId: 1 }) ===
          getWebSocketPublicClient({ chainId: 1 }),
      ).toBeTruthy()
    })
  })
})
