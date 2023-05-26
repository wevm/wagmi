import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'

import { config, projectId } from '../test/index.js'
import { walletConnect } from './walletConnect.js'

const handlers = [
  rest.get('https://relay.walletconnect.com', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        topic: '222781e3-3fad-4184-acde-077796bf0d3d',
        type: 'sub',
        payload: '',
        silent: true,
      }),
    )
  }),
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
  const connectorFn = walletConnect({ projectId })
  const connector = config._internal.setup(connectorFn)
  expect(connector.name).toEqual('WalletConnect')
})
