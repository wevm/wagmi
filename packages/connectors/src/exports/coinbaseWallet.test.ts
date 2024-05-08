import { expect, test } from 'vitest'

import * as exports from './coinbaseWallet.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "coinbaseWallet",
    ]
  `)
})
