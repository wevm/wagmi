import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

vi.mock('accounts', () => ({
  Provider: {
    create: () => ({
      getClient: vi.fn(),
      on: vi.fn(),
      removeListener: vi.fn(),
      request: vi.fn(),
    }),
  },
  dialog: vi.fn(() => ({})),
}))

import { tempoWallet } from './Connectors.js'

test('setup', () => {
  const connectorFn = tempoWallet()
  const connector = config._internal.connectors.setup(connectorFn)

  expect(connector.name).toEqual('Tempo Wallet')
  expect(connector.id).toEqual('xyz.tempo')
})
