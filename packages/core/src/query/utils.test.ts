import { expect, test } from 'vitest'

import { structuralSharing } from './utils.js'

test('structuralSharing', () => {
  expect(
    structuralSharing({ foo: 'bar' }, { foo: 'bar' }),
  ).toMatchInlineSnapshot(`
    {
      "foo": "bar",
    }
  `)
  expect(
    structuralSharing({ foo: 'bar' }, { foo: 'baz' }),
  ).toMatchInlineSnapshot(`
    {
      "foo": "baz",
    }
  `)
})
