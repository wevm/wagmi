import { config, walletConnectProjectId } from '@wagmi/test'
import { http, HttpResponse } from 'msw'
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
