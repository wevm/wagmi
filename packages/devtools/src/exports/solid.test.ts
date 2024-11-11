import { expect, test } from 'vitest'

import * as exports from './solid.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "WagmiDevtools",
    ]
  `)
})
