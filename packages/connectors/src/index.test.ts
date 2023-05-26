import { expect, test } from 'vitest'

import * as connectors from './index.js'

test('exports', () => {
  expect(connectors).toMatchInlineSnapshot(`
    {
      "coinbaseWallet": [Function],
      "injected": [Function],
      "walletConnect": [Function],
    }
  `)
})
