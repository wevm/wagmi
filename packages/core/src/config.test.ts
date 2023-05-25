import { createPublicClient, http } from 'viem'
import { describe, expect, it } from 'vitest'

import {
  getPublicClient,
  getWalletClients,
  getWebSocketPublicClient,
  setupConfig,
  testChains,
} from '../test'
import { connect, disconnect } from './actions'
import { goerli, mainnet } from './chains'
import { Config, createConfig, getConfig } from './config'
import { MockConnector } from './connectors/mock'
import { createStorage, noopStorage } from './storage'

const publicClient = () =>
  Object.assign(createPublicClient({ chain: mainnet, transport: http() }), {
    chains: testChains,
  })

describe('createConfig', () => {
  it('returns config', () => {
    const config = createConfig({
      publicClient,
    })
    expect(config).toBeInstanceOf(Config)
  })

  describe('config', () => {
    describe('autoConnect', () => {
      describe('true', () => {
        it('disconnected', async () => {
          const config = createConfig({
            autoConnect: true,
            publicClient,
          })
          expect(config.status).toMatchInlineSnapshot(`"connecting"`)
          await config.autoConnect()
          expect(config.status).toMatchInlineSnapshot(`"disconnected"`)
        })

        it('connected', async () => {
          const config = createConfig({
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
          expect(config.status).toMatchInlineSnapshot(`"connecting"`)
          await config.autoConnect()
          expect(config.status).toMatchInlineSnapshot(`"connected"`)
        })

        it('reconnected', async () => {
          const localStorage: Record<string, any> = {}
          const storage = createStorage({
            storage: {
              getItem: (key) => localStorage[key],
              setItem: (key, value) => {
                localStorage[key] = value
              },
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
          const config = createConfig({
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
          expect(config.status).toMatchInlineSnapshot(`"reconnecting"`)
          await config.autoConnect()
          expect(config.status).toMatchInlineSnapshot(`"connected"`)
        })
      })

      it('false', () => {
        const config = createConfig({
          autoConnect: false,
          publicClient,
        })
        expect(config.status).toMatchInlineSnapshot(`"disconnected"`)
      })
    })

    describe('chains', () => {
      it('default', async () => {
        const config = setupConfig({ chains: [mainnet, goerli] })
        expect(config.chains).toBeUndefined()
      })

      it('autoConnect', async () => {
        const config = setupConfig({ chains: [mainnet, goerli] })
        expect(config.chains).toBeUndefined()
        await config.autoConnect()
        expect(config.chains?.length).toEqual(2)
        await disconnect()
        expect(config.chains).toBeUndefined()
      })

      it('connect', async () => {
        const config = setupConfig({ chains: [mainnet, goerli] })
        expect(config.chains).toBeUndefined()
        await connect({ connector: config.connectors[0]! })
        expect(config.chains?.length).toEqual(2)
        await disconnect()
        expect(config.chains).toBeUndefined()
      })
    })

    describe('connectors', () => {
      it('default', () => {
        const config = createConfig({
          publicClient,
        })
        expect(config.connectors.map((x) => x.name)).toMatchInlineSnapshot(`
          [
            "Injected",
          ]
        `)
      })

      it('custom', () => {
        const config = createConfig({
          connectors: [
            new MockConnector({
              options: {
                walletClient: getWalletClients()[0]!,
              },
            }),
          ],
          publicClient,
        })
        expect(config.connectors.map((x) => x.name)).toMatchInlineSnapshot(`
          [
            "Mock",
          ]
        `)
      })
    })

    describe('publicClient', () => {
      it('default', () => {
        const config = createConfig({
          publicClient,
        })
        expect(config.publicClient).toBeDefined()
      })

      it('custom', () => {
        const config = createConfig({
          publicClient: getPublicClient(),
        })
        expect(config.publicClient).toMatchInlineSnapshot(
          '"<PublicClient network={1} />"',
        )
      })
    })

    describe('publicClients', () => {
      it('default', () => {
        const config = createConfig({
          publicClient: getPublicClient,
        })
        expect(config.publicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<PublicClient network={1} />",
          }
        `)
      })

      it('publicClient changes bust cache', async () => {
        const config = createConfig({
          publicClient: getPublicClient,
        })
        const client = config.getPublicClient({ chainId: goerli.id })

        expect(
          client === config.getPublicClient({ chainId: goerli.id }),
        ).toBeTruthy()
        expect(config.publicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<PublicClient network={1} />",
            5 => "<PublicClient network={5} />",
          }
        `)

        config.setPublicClient(getPublicClient)

        expect(
          client === config.getPublicClient({ chainId: goerli.id }),
        ).toBeFalsy()
        expect(config.publicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<PublicClient network={1} />",
            5 => "<PublicClient network={5} />",
          }
        `)
      })

      it('autoConnect w/ stored chainId', () => {
        const config = createConfig({
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
        expect(config.publicClients).toMatchInlineSnapshot(`
          Map {
            5 => "<PublicClient network={5} />",
          }
        `)
      })
    })

    describe('storage', () => {
      it('default', () => {
        const config = createConfig({
          publicClient,
        })
        expect(config.storage).toMatchInlineSnapshot(`
          {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
          }
        `)
      })

      it('custom', () => {
        const config = createConfig({
          publicClient,
          storage: createStorage({
            storage: window.localStorage,
          }),
        })
        expect(config.storage).toMatchInlineSnapshot(`
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
        const config = createConfig({
          publicClient,
        })
        expect(config.webSocketPublicClient).toBeUndefined()
      })

      it('custom', async () => {
        const config = createConfig({
          publicClient,
          webSocketPublicClient: getWebSocketPublicClient(),
        })
        expect(config.webSocketPublicClient).toMatchInlineSnapshot(
          '"<WebSocketPublicClient network={1} />"',
        )
      })
    })

    describe('webSocketPublicClients', () => {
      it('default', () => {
        const config = createConfig({
          publicClient,
          webSocketPublicClient: getWebSocketPublicClient,
        })
        expect(config.webSocketPublicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<WebSocketPublicClient network={1} />",
          }
        `)
      })

      it('webSocketPublicClient changes bust cache', async () => {
        const config = createConfig({
          publicClient,
          webSocketPublicClient: getWebSocketPublicClient,
        })
        const client = config.getWebSocketPublicClient({ chainId: goerli.id })

        expect(
          client === config.getWebSocketPublicClient({ chainId: goerli.id }),
        ).toBeTruthy()
        expect(config.webSocketPublicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<WebSocketPublicClient network={1} />",
            5 => "<WebSocketPublicClient network={5} />",
          }
        `)

        config.setWebSocketPublicClient(getWebSocketPublicClient)

        expect(
          client === config.getWebSocketPublicClient({ chainId: goerli.id }),
        ).toBeFalsy()
        expect(config.webSocketPublicClients).toMatchInlineSnapshot(`
          Map {
            -1 => "<WebSocketPublicClient network={1} />",
            5 => "<WebSocketPublicClient network={5} />",
          }
        `)
      })

      it('autoConnect w/ stored chainId', () => {
        const config = createConfig({
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
        expect(config.webSocketPublicClients).toMatchInlineSnapshot(`
          Map {
            5 => "<WebSocketPublicClient network={5} />",
          }
        `)
      })
    })
  })
})

describe('getConfig', () => {
  it('returns default config', () => {
    expect(getConfig()).toBeDefined()
  })

  it('returns created config', () => {
    const config = createConfig({
      publicClient,
    })
    expect(getConfig()).toEqual(config)
  })
})
