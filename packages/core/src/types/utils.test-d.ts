import { assertType, expectTypeOf, test } from 'vitest'

import {
  type Evaluate,
  type ExactPartial,
  type IsNever,
  type Mutable,
  type OneOf,
  type PartialBy,
} from './utils.js'

test('ExactPartial', () => {
  expectTypeOf<ExactPartial<{ foo: boolean; bar: boolean }>>().toEqualTypeOf<{
    foo?: boolean | undefined
    bar?: boolean | undefined
  }>()
})

test('IsNever', () => {
  expectTypeOf<IsNever<never>>().toEqualTypeOf<true>()
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
  type Result = Evaluate<PartialBy<{ foo: string; bar: number }, 'foo'>>
  expectTypeOf<Result>().toEqualTypeOf<{
    foo?: string | undefined
    bar: number
  }>()
})
