import { type Hex, http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { getBlockQueryOptions } from './getBlock.js'

const context = {} as any

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const options = getBlockQueryOptions(config)
  const result = await options.queryFn(context)
  if (result.chainId === celo.id) {
    expectTypeOf(result.difficulty).toEqualTypeOf<bigint>()
    expectTypeOf(result.gasLimit).toEqualTypeOf<bigint>()
    expectTypeOf(result.mixHash).toEqualTypeOf<Hex>()
    expectTypeOf(result.nonce).toEqualTypeOf<`0x${string}`>()
    expectTypeOf(result.uncles).toEqualTypeOf<Hex[]>()
  }
})

test('chainId', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const options = getBlockQueryOptions(config, { chainId: celo.id })
  const result = await options.queryFn(context)
  expectTypeOf(result.difficulty).toEqualTypeOf<bigint>()
  expectTypeOf(result.gasLimit).toEqualTypeOf<bigint>()
  expectTypeOf(result.mixHash).toEqualTypeOf<Hex>()
  expectTypeOf(result.nonce).toEqualTypeOf<`0x${string}`>()
})
