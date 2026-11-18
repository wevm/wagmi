import { EventEmitter } from 'node:events'
import { connect, createConfig, http } from '@wagmi/core'
import { mainnet, optimism } from '@wagmi/core/chains'
import type { EthereumProvider } from '@walletconnect/ethereum-provider'
import { beforeEach, expect, test, vi } from 'vitest'

import { walletConnect } from './walletConnect.js'

type Provider = Awaited<ReturnType<typeof EthereumProvider.init>>

const { init } = vi.hoisted(() => ({
  init: vi.fn<typeof EthereumProvider.init>(),
}))

vi.mock('@walletconnect/ethereum-provider', () => ({
  EthereumProvider: { init },
}))

beforeEach(() => {
  init.mockReset()
})

function deferred<value>() {
  let resolve!: (value: value) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<value>((resolve_, reject_) => {
    resolve = resolve_
    reject = reject_
  })
  return { promise, resolve, reject }
}

function configure() {
  return createConfig({
    chains: [mainnet, optimism],
    connectors: [
      walletConnect({
        projectId: 'test',
        showQrModal: false,
        isNewChainsStale: false,
      }),
    ],
    transports: { [mainnet.id]: http(), [optimism.id]: http() },
    storage: null,
    multiInjectedProviderDiscovery: false,
  })
}

function createProvider() {
  const events = new EventEmitter()
  const accounts = ['0x0000000000000000000000000000000000000001']
  const provider = {
    accounts,
    chainId: mainnet.id,
    session: undefined as { topic: string } | undefined,
    events,
    on: events.on.bind(events),
    removeListener: events.removeListener.bind(events),
    connect: vi.fn(async () => {
      events.emit('display_uri', 'wc:test')
      provider.session = { topic: 'test' }
      events.emit('connect', { chainId: mainnet.id })
    }),
    enable: vi.fn(async () => accounts),
    disconnect: vi.fn(async () => {
      provider.session = undefined
      events.emit('disconnect')
    }),
  }
  return { provider: provider as unknown as Provider, events }
}

test('shares pending initialization and caches the successful provider', async () => {
  const initialization = deferred<Provider>()
  init.mockReturnValueOnce(initialization.promise)
  const config = configure()
  const connector = config.connectors[0]
  const first = connector.getProvider()
  const second = connector.getProvider()

  await vi.waitFor(() => expect(init).toHaveBeenCalledTimes(1))
  const { provider, events } = createProvider()
  initialization.resolve(provider)
  expect(await Promise.all([first, second])).toEqual([provider, provider])
  expect(await connector.getProvider()).toBe(provider)
  await connector.setup?.()

  expect(init).toHaveBeenCalledTimes(1)
  expect(events.getMaxListeners()).toBe(Number.POSITIVE_INFINITY)
  expect(events.listenerCount('connect')).toBe(1)
  expect(events.listenerCount('session_delete')).toBe(1)
})

test('shares a failed initialization and retries without replacing its error', async () => {
  const initialization = deferred<Provider>()
  init.mockReturnValueOnce(initialization.promise)
  const config = configure()
  const connector = config.connectors[0]
  const first = connector.getProvider()
  const second = connector.getProvider()
  const results = Promise.allSettled([first, second])
  const failure = new Error('temporary initialization failure')

  await vi.waitFor(() => expect(init).toHaveBeenCalledTimes(1))
  initialization.reject(failure)
  for (const result of await results) {
    expect(result.status).toBe('rejected')
    if (result.status === 'rejected') expect(result.reason).toBe(failure)
  }

  const retry = deferred<Provider>()
  init.mockReturnValueOnce(retry.promise)
  const third = connector.getProvider()
  const fourth = connector.getProvider()
  const retryResults = Promise.allSettled([third, fourth])
  await vi.waitFor(() => expect(init).toHaveBeenCalledTimes(2))
  const { provider } = createProvider()
  retry.resolve(provider)
  for (const result of await retryResults) {
    expect(result.status).toBe('fulfilled')
    if (result.status === 'fulfilled') expect(result.value).toBe(provider)
  }
  expect(await connector.getProvider()).toBe(provider)
  expect(init).toHaveBeenCalledTimes(2)
})

test('recovers after consecutive failures and preserves each original error', async () => {
  const first = new Error('first initialization failure')
  const second = new Error('second initialization failure')
  const { provider } = createProvider()
  init
    .mockRejectedValueOnce(first)
    .mockRejectedValueOnce(second)
    .mockResolvedValueOnce(provider)
  const config = configure()
  const connector = config.connectors[0]

  await expect(connector.getProvider()).rejects.toBe(first)
  await expect(connect(config, { connector })).rejects.toBe(second)
  expect(config.state.status).toBe('disconnected')
  expect(await connector.getProvider()).toBe(provider)
  expect(await connector.getProvider()).toBe(provider)
  expect(init).toHaveBeenCalledTimes(3)
})

test('connects and handles provider events after automatic setup fails', async () => {
  const initialization = deferred<Provider>()
  init.mockReturnValueOnce(initialization.promise)
  const config = configure()
  const connector = config.connectors[0]
  const setup = connector.setup?.()
  await vi.waitFor(() => expect(init).toHaveBeenCalledTimes(1))
  initialization.reject(new Error('temporary setup failure'))
  await setup

  const { provider, events } = createProvider()
  init.mockResolvedValueOnce(provider)
  const message = vi.fn()
  connector.emitter.on('message', message)
  expect(await connect(config, { connector })).toEqual({
    accounts: provider.accounts,
    chainId: mainnet.id,
  })
  expect(config.state.status).toBe('connected')
  expect(message).toHaveBeenCalledWith(
    expect.objectContaining({ type: 'display_uri', data: 'wc:test' }),
  )
  expect(events.listenerCount('display_uri')).toBe(0)
  expect(events.listenerCount('connect')).toBe(0)
  for (const event of [
    'accountsChanged',
    'chainChanged',
    'disconnect',
    'session_delete',
  ])
    expect(events.listenerCount(event)).toBe(1)

  const accounts = ['0x0000000000000000000000000000000000000002']
  events.emit('accountsChanged', accounts)
  events.emit('chainChanged', '0xa')
  expect(config.state.connections.get(connector.uid)).toMatchObject({
    accounts,
    chainId: optimism.id,
  })

  events.emit('session_delete', { topic: 'test' })
  await vi.waitFor(() => {
    expect(config.state.status).toBe('disconnected')
    expect(events.listenerCount('session_delete')).toBe(0)
    expect(events.listenerCount('connect')).toBe(1)
  })
  expect(events.listenerCount('accountsChanged')).toBe(0)
  expect(events.listenerCount('chainChanged')).toBe(0)
  expect(events.listenerCount('disconnect')).toBe(0)

  events.emit('connect', { chainId: mainnet.id })
  await vi.waitFor(() => expect(config.state.status).toBe('connected'))
  expect(init).toHaveBeenCalledTimes(2)
})
