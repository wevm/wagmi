import { expect, test } from 'vitest'

import * as exports from './react.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "WagmiDevtools",
    ]
  `)
})
