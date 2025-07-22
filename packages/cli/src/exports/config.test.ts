import { expect, test, vi } from 'vitest'

import * as Exports from './config.js'

test('exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "defineConfig",
      "defaultConfig",
    ]
  `)
})
