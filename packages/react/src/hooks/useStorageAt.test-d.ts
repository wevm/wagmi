import type { Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useStorageAt } from './useStorageAt.js'

test('select data', () => {
  const result = useStorageAt({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<Hex | undefined>()
})
