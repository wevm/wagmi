import { assertType, expectTypeOf, test } from 'vitest'

import type { OneOf, PartialBy } from './types.js'

test('OneOf', () => {
  assertType<OneOf<{ foo: boolean } | { bar: boolean }>>({ foo: false })
  assertType<OneOf<{ foo: boolean } | { bar: boolean }>>({ bar: false })
})

test('PartialBy', () => {
  type Result = PartialBy<{ foo: string; bar: number }, 'foo'>
  expectTypeOf<Result>().toEqualTypeOf<{ foo?: string; bar: number }>()
})
