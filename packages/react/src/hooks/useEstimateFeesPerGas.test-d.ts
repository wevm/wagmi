import { expectTypeOf, test } from 'vitest'
import { useEstimateFeesPerGas } from './useEstimateFeesPerGas.js'

test('types', () => {
  const result = useEstimateFeesPerGas()
  expectTypeOf(result.data).toEqualTypeOf<
    | {
        gasPrice?: undefined
        maxFeePerGas: bigint
        maxPriorityFeePerGas: bigint
        formatted: {
          gasPrice?: undefined
          maxFeePerGas: string
          maxPriorityFeePerGas: string
        }
      }
    | undefined
  >()

  const result2 = useEstimateFeesPerGas({ type: 'legacy' })
  expectTypeOf(result2.data).toEqualTypeOf<
    | {
        gasPrice: bigint
        maxFeePerGas?: undefined
        maxPriorityFeePerGas?: undefined
        formatted: {
          gasPrice: string
          maxFeePerGas?: undefined
          maxPriorityFeePerGas?: undefined
        }
      }
    | undefined
  >()

  const result3 = useEstimateFeesPerGas({ type: 'eip1559' })
  expectTypeOf(result3.data).toEqualTypeOf<
    | {
        gasPrice?: undefined
        maxFeePerGas: bigint
        maxPriorityFeePerGas: bigint
        formatted: {
          gasPrice?: undefined
          maxFeePerGas: string
          maxPriorityFeePerGas: string
        }
      }
    | undefined
  >()
})
