import { expectTypeOf, test } from 'vitest'

import { useEstimateGas } from './useEstimateGas.js'

test('select data', () => {
  const result = useEstimateGas({
    query: {
      select(data) {
        return data.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
