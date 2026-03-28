import { config, walletConnectProjectId } from '@wagmi/test'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  expect,
  expectTypeOf,
  test,
  vi,
} from 'vitest'

import { walletConnect } from './walletConnect.js'

vi.mock('@walletconnect/ethereum-provider', () => ({
  EthereumProvider: {
    init: vi.fn(),
  },
}))

const handlers = [
  http.get('https://relay.walletconnect.com', async () =>
    HttpResponse.json(
      {
        topic: '222781e3-3fad-4184-acde-077796bf0d3d',
        type: 'sub',
        payload: '',
        silent: true,
      },
      { status: 200 },
    ),
  ),
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })

  const matchMedia = vi.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  })
  vi.stubGlobal('matchMedia', matchMedia)
})

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('setup', () => {
  const connectorFn = walletConnect({ projectId: walletConnectProjectId })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('WalletConnect')

  type ConnectFnParameters = NonNullable<
    Parameters<(typeof connector)['connect']>[0]
  >
  expectTypeOf<ConnectFnParameters['pairingTopic']>().toMatchTypeOf<
    string | undefined
  >()
})

test('behavior: removes change listener from emitter after switchChain fails', async () => {
  const { EthereumProvider } = await import('@walletconnect/ethereum-provider')

  const mockProvider = {
    events: { setMaxListeners: vi.fn() },
    on: vi.fn(),
    off: vi.fn(),
    once: vi.fn(),
    removeListener: vi.fn(),
    request: vi
      .fn()
      .mockRejectedValue(
        Object.assign(new Error('User rejected the request.'), { code: 4001 }),
      ),
  }
  vi.mocked(EthereumProvider.init).mockResolvedValue(mockProvider as any)

  const connectorFn = walletConnect({ projectId: walletConnectProjectId })
  const connector = config._internal.connectors.setup(connectorFn)

  // Force provider initialization
  await connector.getProvider()

  const listenersBefore = connector.emitter.listenerCount('change')

  await expect(
    connector.switchChain!({ chainId: 1 }),
  ).rejects.toThrow()

  // The listener registered inside switchChain must be cleaned up on failure
  expect(connector.emitter.listenerCount('change')).toBe(listenersBefore)
})
