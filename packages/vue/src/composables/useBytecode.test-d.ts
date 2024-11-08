import type { Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useBytecode } from './useBytecode.js'

test('select data', () => {
  const result = useBytecode({
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Hex | undefined>()
        return data
      },
    },
  })
  expectTypeOf(result.data.value).toEqualTypeOf<Hex | undefined>()
})
