import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { estimateFeesPerGas } from './estimateFeesPerGas.js'

test('types', async () => {
  // default
  {
    const result = await estimateFeesPerGas(config, {})
    expectTypeOf(result).toEqualTypeOf<{
      gasPrice?: undefined
      maxFeePerBlobGas?: undefined
      maxFeePerGas: bigint
      maxPriorityFeePerGas: bigint
    }>()
  }

  // legacy
  {
    const result = await estimateFeesPerGas(config, { type: 'legacy' })
    expectTypeOf(result).toEqualTypeOf<{
      gasPrice: bigint
      maxFeePerBlobGas?: undefined
      maxFeePerGas?: undefined
      maxPriorityFeePerGas?: undefined
    }>()
  }

  // eip1559
  {
    const result = await estimateFeesPerGas(config, { type: 'eip1559' })
    expectTypeOf(result).toEqualTypeOf<{
      gasPrice?: undefined
      maxFeePerBlobGas?: undefined
      maxFeePerGas: bigint
      maxPriorityFeePerGas: bigint
    }>()
  }
})
