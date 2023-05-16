import { expectTypeOf, test } from 'vitest'

import type { PartialBy } from './types.js'

test('PartialBy', () => {
  type Result = PartialBy<{ foo: string; bar: number }, 'foo'>
  expectTypeOf<Result>().toEqualTypeOf<{ foo?: string; bar: number }>()
})
