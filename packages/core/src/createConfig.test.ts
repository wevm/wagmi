import { accounts, chain, wait } from '@wagmi/test'
import { http } from 'viem'
import { expect, test, vi } from 'vitest'

import { connect } from './actions/connect.js'
import { disconnect } from './actions/disconnect.js'
import { switchChain } from './actions/switchChain.js'
import { mock } from './connectors/mock.js'
import { createConfig } from './createConfig.js'
import { createStorage } from './createStorage.js'

const { mainnet, optimism } = chain

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
    "Chain not configured.

    Version: @wagmi/core@x.y.z"
  `)

  expect(() => {
    // @ts-expect-error
    config.state.chainId = 123456
    config.getClient()
  }).toThrowErrorMatchingInlineSnapshot(`
    "Chain not configured.

    Version: @wagmi/core@x.y.z"
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
      version: NaN, // mocked version is `'x.y.z'`, which will get interpreted as `NaN`
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
    chains: [mainnet],
    storage,
    transports: { [mainnet.id]: http() },
  })

  await wait(100)

  expect(config.state).toMatchInlineSnapshot(`
    {
      "chainId": 10,
      "connections": Map {},
      "current": undefined,
      "status": "disconnected",
    }
  `)
})
