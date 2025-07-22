import { expect, test, vi } from 'vitest'

import * as connectors from './connectors.js'

test('exports', () => {
  expect(Object.keys(connectors)).toMatchInlineSnapshot(`
    [
      "injected",
      "mock",
      "baseAccount",
      "coinbaseWallet",
      "metaMask",
      "safe",
      "walletConnect",
      "version",
    ]
  `)
})
