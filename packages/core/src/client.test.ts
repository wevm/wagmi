import { createPublicClient, http } from 'viem'
import { describe, expect, it } from 'vitest'

import {
  getPublicClient,
  getWalletClients,
  getWebSocketPublicClient,
  setupClient,
  testChains,
} from '../test'
import { connect, disconnect } from './actions'
import { goerli, mainnet } from './chains'
import { Client, createClient, getClient } from './client'
import { MockConnector } from './connectors/mock'
import { createStorage, noopStorage } from './storage'

const publicClient = () =>
  Object.assign(createPublicClient({ chain: mainnet, transport: http() }), {
    chains: testChains,
  })

describe('createClient', () => {
  it('returns client', () => {
    const client = createClient({
      publicClient,
    })
    expect(client).toBeInstanceOf(Client)
  })

  describe('config', () => {
    describe('autoConnect', () => {
      describe('true', () => {
        it('disconnected', async () => {
          const client = createClient({
            autoConnect: true,
            publicClient,
          })
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
                  walletClient: getWalletClients()[0]!,
                },
              }),
            ],
            publicClient,
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
              setItem: (key, value) => (localStorage[key] = value),
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
                  walletClient: getWalletClients()[0]!,
                },
              }),
            ],
            publicClient,
            storage,
          })
          expect(client.status).toMatchInlineSnapshot(`"reconnecting"`)
          await client.autoConnect()
          expect(client.status).toMatchInlineSnapshot(`"connected"`)
        })
      })

      it('false', () => {
        const client = createClient({
          autoConnect: false,
          publicClient,
        })
        expect(client.status).toMatchInlineSnapshot(`"disconnected"`)
      })
    })

    describe('chains', () => {
      it('default', async () => {
        const client = setupClient({ chains: [mainnet, goerli] })
        expect(client.chains).toBeUndefined()
      })

      it('autoConnect', async () => {
        const client = setupClient({ chains: [mainnet, goerli] })
        expect(client.chains).toBeUndefined()
        await client.autoConnect()
        expect(client.chains?.length).toEqual(2)
        await disconnect()
        expect(client.chains).toBeUndefined()
      })

      it('connect', async () => {
        const client = setupClient({ chains: [mainnet, goerli] })
        expect(client.chains).toBeUndefined()
        await connect({ connector: client.connectors[0]! })
        expect(client.chains?.length).toEqual(2)
        await disconnect()
        expect(client.chains).toBeUndefined()
      })
    })

    describe('connectors', () => {
      it('default', () => {
        const client = createClient({
          publicClient,
        })
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
                walletClient: getWalletClients()[0]!,
              },
            }),
          ],
          publicClient,
        })
        expect(client.connectors.map((x) => x.name)).toMatchInlineSnapshot(`
          [
            "Mock",
          ]
        `)
      })
    })

    describe('publicClient', () => {
      it('default', () => {
        const client = createClient({
          publicClient,
        })
        expect(client.publicClient).toBeDefined()
      })

      it('custom', () => {
        const client = createClient({
          publicClient: getPublicClient(),
        })
        expect(client.publicClient).toMatchInlineSnapshot(
          '"<PublicClient network={1} />"',
        )
      })
    })

    describe('publicClients', () => {
      it('default', () => {
        const client = createClient({
          publicClient: getPublicClient,
        })
        expect(client.publicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<PublicClient network={1} />",
          }
        `)
      })

      it('autoConnect w/ stored chainId', () => {
        const client = createClient({
          autoConnect: true,
          storage: createStorage({
            storage: {
              ...noopStorage,
              getItem(key) {
                if (key === 'wagmi.store')
                  return JSON.stringify({
                    state: { data: { chain: { id: 5 } } },
                  })
                return null
              },
            },
          }),
          publicClient: getPublicClient,
        })
        expect(client.publicClients).toMatchInlineSnapshot(`
          Map {
            5 => "<PublicClient network={5} />",
          }
        `)
      })
    })

    describe('storage', () => {
      it('default', () => {
        const client = createClient({
          publicClient,
        })
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
          publicClient,
          storage: createStorage({
            storage: window.localStorage,
          }),
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

    describe('webSocketPublicClient', () => {
      it('default', () => {
        const client = createClient({
          publicClient,
        })
        expect(client.webSocketPublicClient).toBeUndefined()
      })

      it('custom', async () => {
        const client = createClient({
          publicClient,
          webSocketPublicClient: getWebSocketPublicClient(),
        })
        expect(client.webSocketPublicClient).toMatchInlineSnapshot(
          '"<WebSocketPublicClient network={1} />"',
        )
      })
    })

    describe('webSocketPublicClients', () => {
      it('default', () => {
        const client = createClient({
          publicClient,
          webSocketPublicClient: getWebSocketPublicClient,
        })
        expect(client.webSocketPublicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<WebSocketPublicClient network={1} />",
          }
        `)
      })

      it('autoConnect w/ stored chainId', () => {
        const client = createClient({
          autoConnect: true,
          storage: createStorage({
            storage: {
              ...noopStorage,
              getItem(key) {
                if (key === 'wagmi.store')
                  return JSON.stringify({
                    state: { data: { chain: { id: 5 } } },
                  })
                return null
              },
            },
          }),
          publicClient: getPublicClient,
          webSocketPublicClient: getWebSocketPublicClient,
        })
        expect(client.webSocketPublicClients).toMatchInlineSnapshot(`
          Map {
            5 => "<WebSocketPublicClient network={5} />",
          }
        `)
      })
    })
  })
})

describe('getClient', () => {
  it('returns default client', () => {
    expect(getClient()).toBeDefined()
  })

  it('returns created client', () => {
    const client = createClient({
      publicClient,
    })
    expect(getClient()).toEqual(client)
  })
})
