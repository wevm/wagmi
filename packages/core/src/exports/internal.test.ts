import { expect, test } from 'vitest'

import * as internal from './internal.js'

test('exports', () => {
  expect(Object.keys(internal)).toMatchInlineSnapshot(`
    [
      "watchChains",
      "createEmitter",
      "Emitter",
      "deepEqual",
      "uid",
    ]
  `)
})
