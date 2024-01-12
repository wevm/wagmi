import { expectTypeOf, test } from 'vitest'

import { type Hex } from 'viem'
import { useBytecode } from './useBytecode.js'

test('select data', () => {
  const result = useBytecode({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<Hex | undefined>()
})
