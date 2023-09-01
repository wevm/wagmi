import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { mainnet } from 'viem/chains'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { WalletConnectConnector } from './walletConnect'

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

describe('WalletConnectConnector', () => {
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

  it('inits', () => {
    const connector = new WalletConnectConnector({
      chains: [mainnet],
      options: {
        projectId: process.env.VITE_WC_PROJECT_ID!,
      },
    })
    expect(connector.name).toEqual('WalletConnect')
  })
})
