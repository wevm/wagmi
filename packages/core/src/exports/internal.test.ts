import { expect, test, vi } from 'vitest'

import * as internal from './internal.js'

test('exports', () => {
  expect(Object.keys(internal)).toMatchInlineSnapshot(`
    [
      "watchChains",
      "Emitter",
      "createEmitter",
      "deepEqual",
      "uid",
    ]
  `)
})
