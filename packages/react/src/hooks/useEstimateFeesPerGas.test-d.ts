import { expectTypeOf, test } from 'vitest'
import { useEstimateFeesPerGas } from './useEstimateFeesPerGas.js'

test('types', () => {
  const result = useEstimateFeesPerGas()
  expectTypeOf(result.data).toMatchTypeOf<
    | {
        gasPrice?: undefined
        maxFeePerGas: bigint
        maxPriorityFeePerGas: bigint
      }
    | undefined
  >()

  const result2 = useEstimateFeesPerGas({ type: 'legacy' })
  expectTypeOf(result2.data).toMatchTypeOf<
    | {
        gasPrice: bigint
        maxFeePerGas?: undefined
        maxPriorityFeePerGas?: undefined
      }
    | undefined
  >()

  const result3 = useEstimateFeesPerGas({ type: 'eip1559' })
  expectTypeOf(result3.data).toMatchTypeOf<
    | {
        gasPrice?: undefined
        maxFeePerGas: bigint
        maxPriorityFeePerGas: bigint
      }
    | undefined
  >()
})
