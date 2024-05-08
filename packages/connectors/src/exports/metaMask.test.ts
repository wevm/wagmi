import { expect, test } from 'vitest'

import * as exports from './metaMask.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "metaMask",
    ]
  `)
})
