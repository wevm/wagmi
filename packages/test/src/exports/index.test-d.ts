import { expectTypeOf } from 'vitest'

// noop test because vitest typecheck fails unless each workspace project has type test
expectTypeOf(1).toEqualTypeOf<number>()
