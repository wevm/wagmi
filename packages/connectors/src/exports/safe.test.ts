import { expect, test } from 'vitest'

import * as exports from './safe.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "safe",
    ]
  `)
})
