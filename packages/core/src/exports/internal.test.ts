import { expect, test } from 'vitest'

import * as internal from './internal.js'

test('exports', () => {
  expect(internal).toMatchInlineSnapshot(`
    {
      "Emitter": [Function],
      "createEmitter": [Function],
      "deepEqual": [Function],
      "uid": [Function],
    }
  `)
})
