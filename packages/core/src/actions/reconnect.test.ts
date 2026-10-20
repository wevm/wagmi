import { accounts, config, mainnet } from '@wagmi/test'
import { http } from 'viem'
import { afterEach, expect, test, vi } from 'vitest'

import { createConnector } from '../connectors/createConnector.js'
import { mock } from '../connectors/mock.js'
import { createConfig } from '../createConfig.js'
import { createStorage } from '../createStorage.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { reconnect } from './reconnect.js'

const connector = config._internal.connectors.setup(
  mock({
    accounts,
    features: { reconnect: true },
  }),
)

function createIsolatedConfig() {
  return createConfig({
    chains: [mainnet],
    connectors: [
      mock({ accounts, features: { defaultConnected: true, reconnect: true } }),
    ],
    storage: null,
    transports: { [mainnet.id]: http() },
  })
}

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
  else if (config.state.current) await disconnect(config)
})

test('default', async () => {
  await expect(
    reconnect(config, { connectors: [connector] }),
  ).resolves.toStrictEqual([])
  expect(config.state.status).toEqual('disconnected')
})

test('parameters: connectors (Connector)', async () => {
  await connect(config, { connector })
  await expect(
    reconnect(config, { connectors: [connector] }),
  ).resolves.toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId: expect.any(Number),
      }),
    ]),
  )
  expect(config.state.status).toEqual('connected')
})

test('parameters: connectors (CreateConnectorFn)', async () => {
  const connector = mock({
    accounts,
    features: { reconnect: true },
  })
  await connect(config, { connector })
  await expect(
    reconnect(config, { connectors: [connector] }),
  ).resolves.toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId: expect.any(Number),
      }),
    ]),
  )
  expect(config.state.status).toEqual('connected')
})

test("behavior: doesn't reconnect if already reconnecting", async () => {
  const config = createIsolatedConfig()
  const results = await Promise.all([reconnect(config), reconnect(config)])
  expect(results.map((x) => x.length)).toEqual([1, 0])
  expect(config.state.status).toEqual('connected')
})

test('behavior: reconnects when status is reconnecting', async () => {
  const config = createIsolatedConfig()
  config.setState((x) => ({ ...x, status: 'reconnecting' }))
  await expect(reconnect(config)).resolves.toHaveLength(1)
  expect(config.state.status).toEqual('connected')
})

test('behavior: reconnects independent configs sequentially', async () => {
  const configs = [createIsolatedConfig(), createIsolatedConfig()]
  for (const config of configs) await reconnect(config)
  expect(configs.map((x) => x.state.status)).toEqual(['connected', 'connected'])
})

test('behavior: reconnects independent configs concurrently', async () => {
  const configs = [createIsolatedConfig(), createIsolatedConfig()]
  const results = await Promise.all(configs.map((x) => reconnect(x)))
  expect(results.map((x) => x.length)).toEqual([1, 1])
  expect(configs.map((x) => x.state.status)).toEqual(['connected', 'connected'])
})

test('behavior: reconnects after connector throws', async () => {
  const broken = createConnector(() => {
    throw new Error('setup failed')
  })
  await expect(
    reconnect(createIsolatedConfig(), { connectors: [broken] }),
  ).rejects.toThrowError('setup failed')
  await expect(reconnect(createIsolatedConfig())).resolves.toHaveLength(1)
})

test('behavior: recovers from invalid state', async () => {
  const state = {
    'wagmi.store': JSON.stringify({
      state: {
        status: 'connected', // <-- invalid - `status` should not be kept in storage
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
    transports: {
      [mainnet.id]: http(),
    },
  })

  await reconnect(config, { connectors: [connector] })

  expect(config.state).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "connections": Map {},
      "current": null,
      "status": "disconnected",
    }
  `)
})

test('behavior: does not strand status if `isAuthorized` rejects', async () => {
  const connector = config._internal.connectors.setup(
    mock({ accounts, features: { reconnect: true } }),
  )
  vi.spyOn(connector, 'isAuthorized').mockRejectedValueOnce(
    new Error('stale session'),
  )

  await expect(
    reconnect(config, { connectors: [connector] }),
  ).resolves.toStrictEqual([])
  expect(config.state.status).toEqual('disconnected')

  // a later `reconnect` is not blocked by a stuck in-progress flag
  await connect(config, { connector })
  await expect(
    reconnect(config, { connectors: [connector] }),
  ).resolves.toHaveLength(1)
})
