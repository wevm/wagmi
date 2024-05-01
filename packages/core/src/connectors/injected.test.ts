import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { injected } from './injected.js'

test('setup', () => {
  const connectorFn = injected()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Injected')
})

test.each([
  { wallet: undefined, expected: 'Injected' },
  { wallet: 'coinbaseWallet', expected: 'Coinbase Wallet' },
  { wallet: 'metaMask', expected: 'MetaMask' },
  { wallet: 'phantom', expected: 'Phantom' },
  { wallet: 'rainbow', expected: 'Rainbow' },
] as const satisfies readonly {
  wallet: string | undefined
  expected: string
}[])('injected({ wallet: $wallet })', ({ wallet, expected }) => {
  const connectorFn = injected({ target: wallet })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual(expected)
})
declare global {
  interface Window {
    ethereum: {
      request: () => Promise<any>
    }
  }
}

test('Any wallet that does not support request({ method: "eth_accounts" })', async () => {
  Object.defineProperty(window, 'ethereum', {
    value: {
      request: vi
        .fn()
        .mockImplementation(() => Promise.reject('Mocked response')),
    },
    writable: true,
  })

  const wallet = undefined
  const connectorFn = injected({ target: wallet })
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.getAccounts()).resolves.toEqual([])

  Object.defineProperty(window, 'ethereum', {
    value: undefined,
  })
})
