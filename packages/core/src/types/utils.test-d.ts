import { assertType, expectTypeOf, test } from 'vitest'

import type { ExactPartial, Mutable, OneOf, PartialBy } from './utils.js'

test('ExactPartial', () => {
  expectTypeOf<ExactPartial<{ foo: boolean; bar: boolean }>>().toEqualTypeOf<{
    foo?: boolean | undefined
    bar?: boolean | undefined
  }>()
})

test('Mutable', () => {
  expectTypeOf<
    Mutable<{ foo: boolean; readonly bar: boolean }>
  >().toEqualTypeOf<{ foo: boolean; bar: boolean }>()
})

test('OneOf', () => {
  assertType<OneOf<{ foo: boolean } | { bar: boolean }>>({ foo: false })
  assertType<OneOf<{ foo: boolean } | { bar: boolean }>>({ bar: false })
})

test('PartialBy', () => {
  type Result = PartialBy<{ foo: string; bar: number }, 'foo'>
  expectTypeOf<Result>().toEqualTypeOf<{
    foo?: string | undefined
    bar: number
  }>()
})
