import { setupWagmiClient } from '../test'
import { Client, createClient } from './client'

describe('WagmiClient', () => {
  it('inits', async () => {
    const { connectors, provider, ...rest } = setupWagmiClient()
    expect(connectors).toBeDefined()
    expect(provider).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "config": {
          "autoConnect": undefined,
          "connectors": [
            "<MockConnector>",
          ],
          "provider": [Function],
          "webSocketProvider": undefined,
        },
        "storage": {
          "getItem": [Function],
          "removeItem": [Function],
          "setItem": [Function],
        },
        "store": {
          "destroy": [Function],
          "getState": [Function],
          "persist": {
            "clearStorage": [Function],
            "hasHydrated": [Function],
            "onFinishHydration": [Function],
            "onHydrate": [Function],
            "rehydrate": [Function],
            "setOptions": [Function],
          },
          "setState": [Function],
          "subscribe": [Function],
        },
      }
    `)
  })
})

describe('createClient', () => {
  it('returns client', () => {
    const client = createClient()
    expect(client).toBeInstanceOf(Client)
  })
})
