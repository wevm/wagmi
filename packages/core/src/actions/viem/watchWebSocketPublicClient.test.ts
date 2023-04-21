import { describe, expect, it } from 'vitest'

import { getWebSocketPublicClient, setupClient } from '../../../test'
import { mainnet, optimism } from '../../chains'
import { connect } from '../accounts/connect'
import { disconnect } from '../accounts/disconnect'
import type { GetWebSocketPublicClientResult } from './getWebSocketPublicClient'
import { watchWebSocketPublicClient } from './watchWebSocketPublicClient'

describe('watchWebSocketPublicClient', () => {
  it('callback receives data', async () => {
    const client = setupClient({
      webSocketPublicClient: getWebSocketPublicClient,
    })

    const providers: GetWebSocketPublicClientResult[] = []
    const unwatch = watchWebSocketPublicClient({}, (provider) =>
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
        "<WebSocketPublicClient network={10} />",
        "<WebSocketPublicClient network={1} />",
      ]
    `)
  })
})
