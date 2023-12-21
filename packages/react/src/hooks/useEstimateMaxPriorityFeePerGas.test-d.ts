import { expectTypeOf, test } from 'vitest'
import { useEstimateMaxPriorityFeePerGas } from './useEstimateMaxPriorityFeePerGas.js'

test('select data', () => {
  const result = useEstimateMaxPriorityFeePerGas({
    query: {
      select(data) {
        return data.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
