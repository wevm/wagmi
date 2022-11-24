import { describe, expect, it } from 'vitest'

import { getWebSocketProvider, setupClient } from '../../../test'
import { connect } from '../accounts/connect'
import { disconnect } from '../accounts/disconnect'
import type { GetWebSocketProviderResult } from './getWebSocketProvider'
import { watchWebSocketProvider } from './watchWebSocketProvider'

describe('watchWebSocketProvider', () => {
  it('callback receives data', async () => {
    const client = setupClient({ webSocketProvider: getWebSocketProvider })
    await client.webSocketProvider?.destroy()

    const providers: GetWebSocketProviderResult[] = []
    const unwatch = watchWebSocketProvider({}, (provider) =>
      providers.push(provider),
    )

    await connect({ connector: client.connectors[0]! })
    await client.webSocketProvider?.destroy()
    await disconnect()
    await client.webSocketProvider?.destroy()
    await connect({ connector: client.connectors[0]! })
    await client.webSocketProvider?.destroy()
    unwatch()

    expect(providers).toMatchInlineSnapshot(`
      [
        "<WebSocketProvider network={1} />",
        "<WebSocketProvider network={1} />",
        "<WebSocketProvider network={1} />",
      ]
    `)
  })
})
