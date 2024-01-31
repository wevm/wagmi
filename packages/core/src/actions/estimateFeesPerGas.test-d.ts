import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { estimateFeesPerGas } from './estimateFeesPerGas.js'

test('types', async () => {
  const default_ = await estimateFeesPerGas(config)
  expectTypeOf(default_).toMatchTypeOf<{
    gasPrice?: undefined
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
    formatted: {
      gasPrice?: undefined
      maxFeePerGas: string
      maxPriorityFeePerGas: string
    }
  }>()

  const legacy = await estimateFeesPerGas(config, { type: 'legacy' })
  expectTypeOf(legacy).toMatchTypeOf<{
    gasPrice: bigint
    maxFeePerGas?: undefined
    maxPriorityFeePerGas?: undefined
    formatted: {
      gasPrice: string
      maxFeePerGas?: undefined
      maxPriorityFeePerGas?: undefined
    }
  }>()

  const eip1559 = await estimateFeesPerGas(config, { type: 'eip1559' })
  expectTypeOf(eip1559).toMatchTypeOf<{
    gasPrice?: undefined
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
    formatted: {
      gasPrice?: undefined
      maxFeePerGas: string
      maxPriorityFeePerGas: string
    }
  }>()
})
