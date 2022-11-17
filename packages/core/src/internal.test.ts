import { expect, it } from 'vitest'

import * as Exports from './internal'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "debounce",
    ]
  `)
})
