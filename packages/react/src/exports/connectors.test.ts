import { expect, test } from 'vitest'

import * as connectors from './connectors.js'

test('exports', () => {
  expect(Object.keys(connectors)).toMatchInlineSnapshot(`
    [
      "baseAccount",
      "coinbaseWallet",
      "injected",
      "metaMask",
      "mock",
      "safe",
      "version",
      "walletConnect",
    ]
  `)
})
