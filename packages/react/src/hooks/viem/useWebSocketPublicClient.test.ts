import { beforeEach, describe, expect, it } from 'vitest'

import {
  getWebSocketPublicClient,
  renderHook,
  setupConfig,
} from '../../../test'
import type { Config } from '../../config'
import { useWebSocketPublicClient } from './useWebSocketPublicClient'

describe('useWebSocketPublicClient', () => {
  let config: Config
  beforeEach(() => {
    config = setupConfig({
      webSocketPublicClient: getWebSocketPublicClient,
    })
  })

  it('mounts', async () => {
    const { result } = renderHook(() => useWebSocketPublicClient(), {
      initialProps: { config },
    })
    expect(result.current).toMatchInlineSnapshot(
      '"<WebSocketPublicClient network={1} />"',
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(
        () => useWebSocketPublicClient({ chainId: 1 }),
        { initialProps: { config } },
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
          initialProps: { config },
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
