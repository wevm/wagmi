import { beforeEach, describe, expect, it } from 'vitest'

import {
  getWebSocketPublicClient,
  renderHook,
  setupClient,
} from '../../../test'
import type { Client } from '../../client'
import { useWebSocketPublicClient } from './useWebSocketPublicClient'

describe('useWebSocketPublicClient', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient({
      webSocketPublicClient: getWebSocketPublicClient,
    })
  })

  it('mounts', async () => {
    const { result } = renderHook(() => useWebSocketPublicClient(), {
      initialProps: { client },
    })
    expect(result.current).toMatchInlineSnapshot(
      '"<WebSocketPublicClient network={1} />"',
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(
        () => useWebSocketPublicClient({ chainId: 1 }),
        { initialProps: { client } },
      )
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketPublicClient network={1} />"`,
      )
    })

    it('switches chainId', async () => {
      let chainId = 1
      const { result } = renderHook(
        () => useWebSocketPublicClient({ chainId }),
        {
          initialProps: { client },
        },
      )
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketPublicClient network={1} />"`,
      )
      chainId = 4
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketPublicClient network={1} />"`,
      )
    })
  })
})
