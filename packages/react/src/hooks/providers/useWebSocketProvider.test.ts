import { beforeEach, describe, expect, it } from 'vitest'

import { getWebSocketProvider, renderHook, setupClient } from '../../../test'
import type { Client } from '../../client'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  let client: Client
  beforeEach(() => {
    client = setupClient({
      webSocketProvider: getWebSocketProvider,
    })
  })

  it('mounts', async () => {
    const { result } = renderHook(() => useWebSocketProvider(), {
      initialProps: { client },
    })
    expect(result.current).toMatchInlineSnapshot(
      '"<WebSocketProvider network={1} />"',
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(
        () => useWebSocketProvider({ chainId: 1 }),
        { initialProps: { client } },
      )
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })

    it('switches chainId', async () => {
      let chainId = 1
      const { result } = renderHook(() => useWebSocketProvider({ chainId }), {
        initialProps: { client },
      })
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
      chainId = 4
      expect(result.current).toMatchInlineSnapshot(
        `"<WebSocketProvider network={1} />"`,
      )
    })
  })
})
