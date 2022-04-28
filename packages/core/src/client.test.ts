import { getProvider, getSigners, getWebSocketProvider } from '../test'
import { Client, createClient, getClient } from './client'
import { MockConnector } from './connectors/mock'
import { createStorage } from './storage'

describe('createClient', () => {
  it('returns client', () => {
    const client = createClient()
    expect(client).toBeInstanceOf(Client)
  })

  describe('config', () => {
    describe('autoConnect', () => {
      describe('true', () => {
        it('disconnected', async () => {
          const client = createClient({ autoConnect: true })
          expect(client.status).toMatchInlineSnapshot(`"connecting"`)
          await client.autoConnect()
          expect(client.status).toMatchInlineSnapshot(`"disconnected"`)
        })

        it('connected', async () => {
          const client = createClient({
            autoConnect: true,
            connectors: [
              new MockConnector({
                options: {
                  flags: { isAuthorized: true },
                  signer: getSigners()[0],
                },
              }),
            ],
          })
          expect(client.status).toMatchInlineSnapshot(`"connecting"`)
          await client.autoConnect()
          expect(client.status).toMatchInlineSnapshot(`"connected"`)
        })

        it('reconnected', async () => {
          const localStorage: Record<string, any> = {}
          const storage = createStorage({
            storage: {
              getItem: (key) => localStorage[key],
              setItem: (key, value) =>
                (localStorage[key] = JSON.stringify(value)),
              removeItem: (key) => delete localStorage[key],
            },
          })
          storage.setItem('store', {
            state: {
              data: {
                account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
              },
            },
          })
          const client = createClient({
            autoConnect: true,
            connectors: [
              new MockConnector({
                options: {
                  flags: { isAuthorized: true },
                  signer: getSigners()[0],
                },
              }),
            ],
            storage,
          })
          expect(client.status).toMatchInlineSnapshot(`"reconnecting"`)
          await client.autoConnect()
          expect(client.status).toMatchInlineSnapshot(`"connected"`)
        })
      })

      it('false', () => {
        const client = createClient({ autoConnect: false })
        expect(client.status).toMatchInlineSnapshot(`"disconnected"`)
      })
    })

    describe('connectors', () => {
      it('default', () => {
        const client = createClient()
        expect(client.connectors.map((x) => x.name)).toMatchInlineSnapshot(`
          [
            "Injected",
          ]
        `)
      })

      it('custom', () => {
        const client = createClient({
          connectors: [
            new MockConnector({
              options: {
                signer: getSigners()[0],
              },
            }),
          ],
        })
        expect(client.connectors.map((x) => x.name)).toMatchInlineSnapshot(`
          [
            "Mock",
          ]
        `)
      })
    })

    describe('provider', () => {
      it('default', () => {
        const client = createClient()
        expect(client.provider).toBeDefined()
      })

      it('custom', () => {
        const client = createClient({
          provider: getProvider,
        })
        expect(client.provider).toMatchInlineSnapshot(
          `"<Provider network={31337} />"`,
        )
      })
    })

    describe('storage', () => {
      it('default', () => {
        const client = createClient()
        expect(client.storage).toMatchInlineSnapshot(`
          {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
          }
        `)
      })

      it('custom', () => {
        const client = createClient({
          storage: createStorage({ storage: window.localStorage }),
        })
        expect(client.storage).toMatchInlineSnapshot(`
          {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
          }
        `)
      })
    })

    describe('webSocketProvider', () => {
      it('default', () => {
        const client = createClient()
        expect(client.webSocketProvider).toBeUndefined()
      })

      it('custom', async () => {
        const client = createClient({
          webSocketProvider: getWebSocketProvider,
        })
        await client.webSocketProvider?.destroy()
        expect(client.webSocketProvider).toMatchInlineSnapshot(
          `"<WebSocketProvider network={31337} />"`,
        )
      })
    })
  })
})

describe('getClient', () => {
  it('returns default client', () => {
    expect(getClient()).toBeDefined()
  })

  it('returns created client', () => {
    const client = createClient()
    expect(getClient()).toEqual(client)
  })
})
