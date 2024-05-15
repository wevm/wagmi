import { expect, test } from 'vitest'

import * as nuxt from './nuxt.js'

test('exports', () => {
  expect(Object.keys(nuxt)).toMatchInlineSnapshot(`
    [
      "default",
    ]
  `)
})
