import { config } from '@wagmi/test'
import type { Provider } from 'accounts'
import { expect, expectTypeOf, test, vi } from 'vitest'

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

test('tempoWallet: accepts Provider.create parameters', () => {
  type ProviderParameters = NonNullable<Parameters<typeof Provider.create>[0]>

  expectTypeOf<tempoWallet.Parameters>().toMatchTypeOf<
    Pick<
      ProviderParameters,
      'authorizeAccessKey' | 'feePayer' | 'mpp' | 'relay' | 'testnet'
    >
  >()

  const authorizeAccessKey = () => ({ expiry: 1 })
  const connectorFn = tempoWallet({
    authorizeAccessKey,
    feePayer: '/relay',
    mpp: false,
    relay: '/relay',
    testnet: true,
  })

  expect(connectorFn).toBeTypeOf('function')
})

test('dangerous_secp256k1: setup', () => {
  const connectorFn = dangerous_secp256k1()
  const connector = config._internal.connectors.setup(connectorFn)

  expect(connector.name).toEqual('EOA (Secp256k1)')
  expect(connector.id).toEqual('secp256k1')
})
