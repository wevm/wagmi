import { accounts, chain, wait } from '@wagmi/test'
import {
  announceProvider,
  type EIP1193Provider,
  type EIP6963ProviderDetail,
} from 'mipd'
import { type Address, http } from 'viem'
import { expect, test, vi } from 'vitest'

import { connect } from './actions/connect.js'
import { disconnect } from './actions/disconnect.js'
import { switchChain } from './actions/switchChain.js'
import { createConnector } from './connectors/createConnector.js'
import { injected } from './connectors/injected.js'
import { mock } from './connectors/mock.js'
import {
  type Connection,
  type Connector,
  createConfig,
} from './createConfig.js'
import { createStorage } from './createStorage.js'
import { serialize } from './utils/serialize.js'

const { mainnet, optimism } = chain

vi.mock(import('mipd'), async (importOriginal) => {
  const mod = await importOriginal()

  let cache: typeof mod | undefined
  if (!cache)
    cache = {
      ...mod,
      createStore() {
        const store = mod.createStore()
        return {
          ...store,
          getProviders() {
            return [
              getProviderDetail({ name: 'Example', rdns: 'com.example' }),
              getProviderDetail({ name: 'Mock', rdns: 'com.mock' }),
            ]
          },
        }
      },
    }
  return cache
})

test('default', () => {
  const config = createConfig({
    chains: [mainnet],
    connectors: [mock({ accounts })],
    transports: {
      [mainnet.id]: http(),
    },
  })
  expect(config).toBeDefined()
})

test('getClient', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    connectors: [mock({ accounts })],
    syncConnectedChain: true,
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: http(),
    },
  })

  {
    const client = config.getClient()
    expect(client.chain.id).toBe(mainnet.id)
  }

  {
    const client = config.getClient({ chainId: mainnet.id })
    expect(client.chain.id).toBe(mainnet.id)
  }

  expect(() =>
    config.getClient({
      // @ts-expect-error
      chainId: 123456,
    }),
  ).toThrowErrorMatchingInlineSnapshot(`
    [ChainNotConfiguredError: Chain not configured.

    Version: @wagmi/core@x.y.z]
  `)

  expect(() => {
    // @ts-expect-error
    config.state.chainId = 123456
    config.getClient()
  }).toThrowErrorMatchingInlineSnapshot(`
    [ChainNotConfiguredError: Chain not configured.

    Version: @wagmi/core@x.y.z]
  `)
})

test('behavior: syncConnectedChain', async () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    connectors: [mock({ accounts })],
    syncConnectedChain: true,
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: http(),
    },
  })
  // defaults to first chain in `createConfig({ chains })`
  expect(config.getClient().chain.id).toBe(mainnet.id)

  // switches to optimism
  await switchChain(config, { chainId: optimism.id })
  expect(config.getClient().chain.id).toBe(optimism.id)

  // connects to mainnet
  await connect(config, {
    chainId: mainnet.id,
    connector: config.connectors[0]!,
  })
  expect(config.getClient().chain.id).toBe(mainnet.id)

  // switches to optimism
  await switchChain(config, { chainId: optimism.id })
  expect(config.getClient().chain.id).toBe(optimism.id)

  // disconnects, still connected to optimism
  await disconnect(config)
  expect(config.getClient().chain.id).toBe(optimism.id)
})

test('behavior: migrate for current version', async () => {
  const state = {
    'wagmi.store': JSON.stringify({
      state: {
        connections: {
          __type: 'Map',
          value: [
            [
              '983b8aca245',
              {
                accounts: [
                  '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                  '0xd2135CfB216b74109775236E36d4b433F1DF507B',
                ],
                chainId: 1,
                connector: {
                  id: 'io.metamask',
                  name: 'MetaMask',
                  type: 'injected',
                  uid: '983b8aca245',
                },
              },
            ],
          ],
        },
        chainId: 1,
        current: '983b8aca245',
      },
      version: Number.NaN, // mocked version is `'x.y.z'`, which will get interpreted as `NaN`
    }),
  } as Record<string, string>
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key) => state[key] ?? null),
      removeItem: vi.fn((key) => state.delete?.[key]),
      setItem: vi.fn((key, value) => {
        state[key] = value
      }),
    },
    writable: true,
  })

  const storage = createStorage<{ store: object }>({
    storage: window.localStorage,
  })

  const config = createConfig({
    chains: [mainnet],
    storage,
    transports: { [mainnet.id]: http() },
  })

  await wait(100)

  expect(config.state).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "connections": Map {
        "983b8aca245" => {
          "accounts": [
            "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
            "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          ],
          "chainId": 1,
          "connector": {
            "id": "io.metamask",
            "name": "MetaMask",
            "type": "injected",
            "uid": "983b8aca245",
          },
        },
      },
      "current": "983b8aca245",
      "status": "disconnected",
    }
  `)
})

test('behavior: migrate chainId', async () => {
  const state = {
    'wagmi.store': JSON.stringify({
      state: { chainId: 10 },
      version: 1,
    }),
  } as Record<string, string>
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key) => state[key] ?? null),
      removeItem: vi.fn((key) => state.delete?.[key]),
      setItem: vi.fn((key, value) => {
        state[key] = value
      }),
    },
    writable: true,
  })

  const storage = createStorage<{ store: object }>({
    storage: window.localStorage,
  })

  const config = createConfig({
    chains: [mainnet, optimism],
    storage,
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: http(),
    },
  })

  await wait(100)

  expect(config.state).toMatchInlineSnapshot(`
    {
      "chainId": 10,
      "connections": Map {},
      "current": null,
      "status": "disconnected",
    }
  `)
})

test('behavior: properties passed through to Viem Client via getClient', () => {
  {
    const properties = {
      batch: {
        multicall: {
          batchSize: 102_400,
        },
      },
      cacheTime: 5_000,
      pollingInterval: 1_000,
    }

    const config = createConfig({
      chains: [mainnet, optimism],
      transports: {
        [mainnet.id]: http(),
        [optimism.id]: http(),
      },
      ...properties,
    })

    const {
      account: _a,
      chain: _c,
      extend: _e,
      key: _k,
      name: _n,
      request: _r,
      transport: _tr,
      uid: _u,
      type: _ty,
      ...rest
    } = config.getClient()
    expect(rest).toEqual(properties)
  }

  {
    const config = createConfig({
      chains: [mainnet, optimism],
      transports: {
        [mainnet.id]: http(),
        [optimism.id]: http(),
      },
      batch: {
        [mainnet.id]: {
          multicall: {
            batchSize: 1024,
          },
        },
      },
    })

    const client = config.getClient()
    expect(client.batch).toMatchInlineSnapshot(`
      {
        "multicall": {
          "batchSize": 1024,
        },
      }
    `)

    const client2 = config.getClient({ chainId: optimism.id })
    expect(client2.batch).toMatchInlineSnapshot(`
      {
        "multicall": true,
      }
    `)
  }
})

test('behavior: restore unconfigured chainId', () => {
  const state = {
    'wagmi.store': JSON.stringify({
      state: { chainId: 10 },
      version: 1,
    }),
  } as Record<string, string>
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key) => state[key] ?? null),
      removeItem: vi.fn((key) => state.delete?.[key]),
      setItem: vi.fn((key, value) => {
        state[key] = value
      }),
    },
    writable: true,
  })

  const storage = createStorage<{ store: object }>({
    storage: window.localStorage,
  })

  const config = createConfig({
    chains: [mainnet],
    storage,
    transports: {
      [mainnet.id]: http(),
    },
  })

  expect(config.state).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "connections": Map {},
      "current": null,
      "status": "disconnected",
    }
  `)

  const client = config.getClient()
  expect(client.chain.id).toBe(mainnet.id)
})

test('behavior: setup connector', async () => {
  const config = createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
    },
  })

  const connectorFn = mock({ accounts })
  const connector = config._internal.connectors.setup(connectorFn)
  config._internal.connectors.setState((x) => [...x, connector])

  await connect(config, {
    chainId: mainnet.id,
    connector: config.connectors.find((x) => x.uid === connector.uid)!,
  })

  expect(config.state.current).toBe(connector.uid)

  await disconnect(config)
})

test('behavior: eip 6963 providers', async () => {
  const detail_1 = getProviderDetail({ name: 'Foo Wallet', rdns: 'com.foo' })
  const detail_2 = getProviderDetail({ name: 'Bar Wallet', rdns: 'com.bar' })
  const detail_3 = getProviderDetail({ name: 'Mock', rdns: 'com.mock' })

  const config = createConfig({
    chains: [mainnet],
    connectors: [
      createConnector((c) => {
        return {
          ...mock({ accounts })(c),
          rdns: ['com.mock', 'com.baz'],
        }
      }),
    ],
    transports: {
      [mainnet.id]: http(),
    },
  })

  await wait(100)
  announceProvider(detail_1)()
  await wait(100)
  announceProvider(detail_1)()
  await wait(100)
  announceProvider(detail_2)()
  await wait(100)
  announceProvider(detail_3)()
  await wait(100)

  expect(
    config.connectors.flatMap((x) => x.rdns ?? x.id),
  ).toMatchInlineSnapshot(`
    [
      "com.mock",
      "com.baz",
      "com.example",
      "com.foo",
      "com.bar",
    ]
  `)
})

test('behavior: revalidate connections', async () => {
  const state = {
    'wagmi.store': serialize({
      state: { chainId: 1 },
      version: 1,
    }),
  } as Record<string, string>
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key) => state[key] ?? null),
      removeItem: vi.fn((key) => state.delete?.[key]),
      setItem: vi.fn((key, value) => {
        state[key] = value
      }),
    },
    writable: true,
  })

  const config = createConfig({
    chains: [mainnet],
    connectors: [
      mock({ accounts }),
      mock({ accounts, features: { defaultConnected: true, reconnect: true } }),
      mock({ accounts }),
    ],
    storage: createStorage<{ store: object }>({
      storage: window.localStorage,
    }),
    transports: {
      [mainnet.id]: http(),
    },
  })

  const connections = new Map<string, Connection>()
  const c1 = config.connectors.at(0)!
  const c2 = config.connectors.at(1)!
  const c3 = config.connectors.at(2)!
  connections.set(c1.uid, { accounts: ['0x'], chainId: 1, connector: c1 })
  connections.set(c2.uid, { accounts: ['0x'], chainId: 1, connector: c2 })
  connections.set(c3.uid, { accounts: ['0x'], chainId: 1, connector: c3 })
  connections.set('foo', {
    accounts: ['0x'],
    chainId: 1,
    connector: {
      id: 'foo',
      name: 'foo',
      type: 'foo',
      uid: 'foo',
    } as Connection['connector'],
  })
  config.setState((state) => ({ ...state, connections }))
  await config._internal.revalidate()

  expect([...config.state.connections.keys()]).toEqual([c2.uid])
})

test('behavior: revalidate removes connection if `isAuthorized` rejects', async () => {
  const config = createConfig({
    chains: [mainnet],
    connectors: [
      mock({ accounts, features: { defaultConnected: true, reconnect: true } }),
      mock({ accounts, features: { defaultConnected: true, reconnect: true } }),
    ],
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })

  const [c1, c2] = config.connectors as [Connector, Connector]
  vi.spyOn(c1, 'isAuthorized').mockRejectedValueOnce(new Error('stale session'))
  config.setState((state) => ({
    ...state,
    connections: new Map([
      [c1.uid, { accounts: ['0x'], chainId: 1, connector: c1 }],
      [c2.uid, { accounts: ['0x'], chainId: 1, connector: c2 }],
    ]),
    current: c1.uid,
  }))

  await expect(config._internal.revalidate()).resolves.toBeUndefined()
  expect([...config.state.connections.keys()]).toEqual([c2.uid])
  expect(config.state.current).toBeNull()
})

test('behavior: wallet-initiated connect removes the connect listener', async () => {
  const explicit = createConfig({
    chains: [mainnet],
    connectors: [mock({ accounts })],
    multiInjectedProviderDiscovery: false,
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })
  await connect(explicit, { connector: explicit.connectors[0]! })
  expect(explicit.connectors[0]!.emitter.listenerCount('connect')).toBe(0)

  const passive = createConfig({
    chains: [mainnet],
    connectors: [mock({ accounts })],
    multiInjectedProviderDiscovery: false,
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })
  const connector = passive.connectors[0]!
  expect(connector.emitter.listenerCount('connect')).toBe(1)

  connector.emitter.emit('connect', {
    accounts,
    chainId: mainnet.id,
  })

  expect(passive.state.status).toBe('connected')
  expect(passive.state.current).toBe(connector.uid)
  // `connect()` / `reconnect()` unsubscribe this listener. The emitter path
  // must do the same: `listenerCount('connect')` means "not connected yet"
  // (`injected` uses it to tell a new connection from an account change).
  expect(connector.emitter.listenerCount('connect')).toBe(0)
  expect(connector.emitter.listenerCount('change')).toBe(1)
  expect(connector.emitter.listenerCount('disconnect')).toBe(1)
})

test('behavior: background account change keeps the active connection', async () => {
  const providerA = createInjectedProvider([accounts[0]!])
  const providerB = createInjectedProvider([accounts[1]!])

  const config = createConfig({
    chains: [mainnet],
    connectors: [
      injected({
        target: { id: 'walletA', name: 'Wallet A', provider: providerA },
      }),
      injected({
        target: { id: 'walletB', name: 'Wallet B', provider: providerB },
      }),
    ],
    multiInjectedProviderDiscovery: false,
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })

  const walletA = config.connectors[0]!
  const walletB = config.connectors[1]!

  await vi.waitFor(() => {
    expect(providerB.listenerCount('accountsChanged')).toBe(1)
  })

  // Wallet B connects itself (MetaMask "manually connect", or `accountsChanged`
  // while no `connect` event exists). This must not leave B subscribed to
  // `connect`, or the next account change is handled as a new connection.
  providerB.emit('accountsChanged', [accounts[1]!])
  await vi.waitFor(() => {
    expect(config.state.connections.has(walletB.uid)).toBe(true)
  })

  await connect(config, { connector: walletA })
  expect(config.state.current).toBe(walletA.uid)

  providerB.setAccounts([accounts[2]!])
  providerB.emit('accountsChanged', [accounts[2]!])
  await vi.waitFor(() => {
    expect(config.state.connections.get(walletB.uid)?.accounts[0]).toBe(
      accounts[2],
    )
  })

  expect(config.state.current).toBe(walletA.uid)
})

function createInjectedProvider(initialAccounts: readonly Address[]) {
  let accounts_ = [...initialAccounts]
  const listeners = new Map<string, Set<(...args: any[]) => void>>()

  return {
    setAccounts(next: readonly Address[]) {
      accounts_ = [...next]
    },
    async request({ method }: { method: string }) {
      if (method === 'eth_accounts' || method === 'eth_requestAccounts')
        return accounts_
      if (method === 'eth_chainId') return '0x1'
      if (method === 'wallet_requestPermissions')
        return [{ caveats: [{ value: accounts_ }] }]
      if (method === 'wallet_revokePermissions') return null
      throw new Error(`unexpected method: ${method}`)
    },
    on(event: string, listener: (...args: any[]) => void) {
      const set = listeners.get(event) ?? new Set()
      set.add(listener)
      listeners.set(event, set)
    },
    removeListener(event: string, listener: (...args: any[]) => void) {
      listeners.get(event)?.delete(listener)
    },
    emit(event: string, ...args: any[]) {
      for (const listener of [...(listeners.get(event) ?? [])])
        listener(...args)
    },
    listenerCount(event: string) {
      return listeners.get(event)?.size ?? 0
    },
  }
}

function getProviderDetail(
  info: Pick<EIP6963ProviderDetail['info'], 'name' | 'rdns'>,
): EIP6963ProviderDetail {
  return {
    info: {
      icon: 'data:image/svg+xml,<svg width="32px" height="32px" viewBox="0 0 32 32"/>',
      uuid: crypto.randomUUID(),
      ...info,
    },
    provider: `<EIP1193Provider_${info.rdns}>` as unknown as EIP1193Provider,
  }
}
