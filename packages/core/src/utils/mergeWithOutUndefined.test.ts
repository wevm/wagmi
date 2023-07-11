import { expect, test } from 'vitest'

import { mergeWithOutUndefined } from './mergeWithOutUndefined.js'

test('no shared keys', () => {
  expect(mergeWithOutUndefined({ a: 1 }, { b: 2 })).toMatchInlineSnapshot(`
    {
      "a": 1,
      "b": 2,
    }
  `)
})

test('shared key', () => {
  expect(
    mergeWithOutUndefined({ a: 1 }, { a: 2, b: 2 }),
  ).toMatchInlineSnapshot(`
    {
      "a": 2,
      "b": 2,
    }
  `)
})

test('shared key undefined', () => {
  expect(
    mergeWithOutUndefined({ a: 1 }, { a: undefined, b: 2 }),
  ).toMatchInlineSnapshot(`
    {
      "a": 1,
      "b": 2,
    }
  `)
  expect(
    mergeWithOutUndefined({ a: undefined }, { a: 1, b: 2 }),
  ).toMatchInlineSnapshot(`
    {
      "a": 1,
      "b": 2,
    }
  `)
})
