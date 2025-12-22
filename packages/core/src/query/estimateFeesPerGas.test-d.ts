import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { estimateFeesPerGasQueryOptions } from './estimateFeesPerGas.js'

const context = {} as any

test('types', async () => {
  // default
  {
    const options = estimateFeesPerGasQueryOptions(config, {})
    const result = await options.queryFn(context)
    expectTypeOf(result).toEqualTypeOf<{
      gasPrice?: undefined
      maxFeePerBlobGas?: undefined
      maxFeePerGas: bigint
      maxPriorityFeePerGas: bigint
    }>()
  }

  // legacy
  {
    const options = estimateFeesPerGasQueryOptions(config, { type: 'legacy' })
    const result = await options.queryFn(context)
    expectTypeOf(result).toEqualTypeOf<{
      gasPrice: bigint
      maxFeePerBlobGas?: undefined
      maxFeePerGas?: undefined
      maxPriorityFeePerGas?: undefined
    }>()
  }

  // eip1559
  {
    const options = estimateFeesPerGasQueryOptions(config, { type: 'eip1559' })
    const result = await options.queryFn(context)
    expectTypeOf(result).toEqualTypeOf<{
      gasPrice?: undefined
      maxFeePerBlobGas?: undefined
      maxFeePerGas: bigint
      maxPriorityFeePerGas: bigint
    }>()
  }
})
