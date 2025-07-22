import { expect, test, vi } from 'vitest'

import * as nuxt from './nuxt.js'

test('exports', () => {
  expect(Object.keys(nuxt)).toMatchInlineSnapshot(`
    [
      "default",
    ]
  `)
})
