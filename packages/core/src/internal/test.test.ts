import { expect, it } from 'vitest'

import * as Exports from './test'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "getSigners",
      "testChains",
    ]
  `)
})
