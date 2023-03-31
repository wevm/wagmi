import { describe, expect, it } from 'vitest'

import { getWebSocketProvider, setupClient } from '../../../test'
import { mainnet, optimism } from '../../chains'
import { connect } from '../accounts/connect'
import { disconnect } from '../accounts/disconnect'
import type { GetWebSocketProviderResult } from './getWebSocketProvider'
import { watchWebSocketProvider } from './watchWebSocketProvider'

describe('watchWebSocketProvider', () => {
  it('callback receives data', async () => {
    const client = setupClient({ webSocketProvider: getWebSocketProvider })

    const providers: GetWebSocketProviderResult[] = []
    const unwatch = watchWebSocketProvider({}, (provider) =>
      providers.push(provider),
    )

    await connect({ connector: client.connectors[0]!, chainId: mainnet.id })
    await disconnect()
    await connect({ connector: client.connectors[0]!, chainId: optimism.id })
    await disconnect()
    await connect({ connector: client.connectors[0]!, chainId: mainnet.id })
    unwatch()

    expect(providers).toMatchInlineSnapshot(`
      [
        "<WebSocketProvider network={10} />",
        "<WebSocketProvider network={1} />",
      ]
    `)
  })
})
