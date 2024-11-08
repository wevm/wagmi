import { accounts, config, mainnet } from '@wagmi/test'
import { http } from 'viem'
import { afterEach, expect, test, vi } from 'vitest'

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
  const previousStatus = config.state.status
  config.setState((x) => ({ ...x, status: 'reconnecting' }))
  await expect(
    reconnect(config, { connectors: [connector] }),
  ).resolves.toStrictEqual([])
  config.setState((x) => ({ ...x, status: previousStatus }))
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
