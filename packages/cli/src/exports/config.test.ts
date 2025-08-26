import { expect, test } from 'vitest'

import * as Exports from './config.js'

test('exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "defaultConfig",
      "defineConfig",
    ]
  `)
})
