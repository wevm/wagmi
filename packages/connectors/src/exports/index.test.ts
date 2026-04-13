import { expect, test, vi } from 'vitest'

vi.mock('accounts/wagmi', () => ({
  tempoWallet: () => undefined,
}))

import * as connectors from './index.js'

test('exports', () => {
  expect(Object.keys(connectors)).toMatchInlineSnapshot(`
    [
      "injected",
      "mock",
      "baseAccount",
      "coinbaseWallet",
      "metaMask",
      "porto",
      "safe",
      "tempoWallet",
      "version",
      "walletConnect",
    ]
  `)
})
