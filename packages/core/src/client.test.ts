import { setupWagmiClient } from '../test'

describe('WagmiClient', () => {
  it('inits', async () => {
    const { connectors, provider, ...rest } = setupWagmiClient()
    expect(connectors).toBeDefined()
    expect(provider).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "config": {
          "autoConnect": false,
          "connectors": [
            "<MockConnector>",
          ],
          "provider": [Function],
          "webSocketProvider": undefined,
        },
        "storage": {
          "clear": [Function],
          "getItem": [Function],
          "key": [Function],
          "length": 0,
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
