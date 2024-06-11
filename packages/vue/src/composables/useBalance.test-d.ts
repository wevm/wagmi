import { expectTypeOf, test } from 'vitest'
import type { Ref } from 'vue'

import { useBalance } from './useBalance.js'

test('select data', () => {
  const result = useBalance({
    query: {
      select(data) {
        return data?.value
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<Ref<bigint> | Ref<undefined>>()
})
