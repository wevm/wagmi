import { expect, test } from 'vitest'

import * as connectors from './connectors.js'

test('exports', () => {
  expect(Object.keys(connectors)).toMatchInlineSnapshot(`
    [
      "coinbaseWallet",
      "injected",
      "ledger",
      "safe",
      "walletConnect",
      "version",
    ]
  `)
})
