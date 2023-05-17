import { expect, test } from 'vitest'

import * as connectors from './connectors.js'

test('exports', () => {
  expect(connectors).toMatchInlineSnapshot(`
    {
      "coinbaseWallet": [Function],
      "injected": [Function],
      "walletConnect": [Function],
    }
  `)
})
