import { expect, test } from 'vitest'

import * as exports from './walletConnect.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "walletConnect",
    ]
  `)
})
