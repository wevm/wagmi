import { expect, test } from 'vitest'

import * as connectors from './connectors.js'

test('exports', () => {
  expect(connectors).toMatchInlineSnapshot(`
    {
      "coinbaseWallet": [Function],
      "injected": [Function],
      "ledger": [Function],
      "safe": [Function],
      "version": "2.0.0",
      "walletConnect": [Function],
    }
  `)
})
