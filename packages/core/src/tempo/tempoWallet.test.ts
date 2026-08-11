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
  dangerous_secp256k1: vi.fn(() => ({})),
  dialog: vi.fn(() => ({})),
}))

import { dangerous_secp256k1, tempoWallet } from './Connectors.js'

test('tempoWallet: setup', () => {
  const connectorFn = tempoWallet()
  const connector = config._internal.connectors.setup(connectorFn)

  expect(connector.name).toEqual('Tempo Wallet')
  expect(connector.id).toEqual('xyz.tempo')
})

test('dangerous_secp256k1: setup', () => {
  const connectorFn = dangerous_secp256k1()
  const connector = config._internal.connectors.setup(connectorFn)

  expect(connector.name).toEqual('EOA (Secp256k1)')
  expect(connector.id).toEqual('secp256k1')
})
