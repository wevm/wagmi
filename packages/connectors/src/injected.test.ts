import { expect, test } from 'vitest'

import { config } from '../test/index.js'
import { type WalletId, injected } from './injected.js'

test('setup', () => {
  const connectorFn = injected()
  const connector = config._internal.setup(connectorFn)
  expect(connector.name).toEqual('Injected')
})

test.each([
  { wallet: undefined, expected: 'Injected' },
  { wallet: 'coinbaseWallet', expected: 'Coinbase Wallet' },
  { wallet: 'metaMask', expected: 'MetaMask' },
  { wallet: 'phantom', expected: 'Phantom' },
  { wallet: 'rainbow', expected: 'Rainbow' },
] as const satisfies readonly {
  wallet: WalletId | undefined
  expected: string
}[])('injected({ wallet: $wallet })', ({ wallet, expected }) => {
  const connectorFn = injected({ wallet })
  const connector = config._internal.setup(connectorFn)
  expect(connector.name).toEqual(expected)
})
