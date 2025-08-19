import { accounts, chain, wait } from '@wagmi/test'
import {
  announceProvider,
  type EIP1193Provider,
  type EIP6963ProviderDetail,
} from 'mipd'
import { http } from 'viem'
import { expect, test, vi } from 'vitest'

import { connect } from './actions/connect.js'
import { disconnect } from './actions/disconnect.js'
import { switchChain } from './actions/switchChain.js'
import { createConnector } from './connectors/createConnector.js'
import { mock } from './connectors/mock.js'
import { createConfig } from './createConfig.js'
import { createStorage } from './createStorage.js'

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
