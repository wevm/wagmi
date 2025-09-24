import { expect, test } from 'vitest'

import * as connectors from './index.js'

test('exports', () => {
  expect(Object.keys(connectors)).toMatchInlineSnapshot(`
    [
      "injected",
      "mock",
      "baseAccount",
      "coinbaseWallet",
      "gemini",
      "metaMask",
      "porto",
      "safe",
      "version",
      "walletConnect",
    ]
  `)
})
