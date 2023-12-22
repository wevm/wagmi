import { http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { getBlock } from './getBlock.js'

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const result = await getBlock(config)
  if (result.chainId === celo.id) {
    expectTypeOf(result.difficulty).toEqualTypeOf<never>()
    expectTypeOf(result.gasLimit).toEqualTypeOf<never>()
    expectTypeOf(result.mixHash).toEqualTypeOf<never>()
    expectTypeOf(result.nonce).toEqualTypeOf<never>()
    expectTypeOf(result.uncles).toEqualTypeOf<never>()
    expectTypeOf(result.randomness).toEqualTypeOf<{
      committed: `0x${string}`
      revealed: `0x${string}`
    }>()
  }
})

test('chainId', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const result = await getBlock(config, {
    chainId: celo.id,
  })
  expectTypeOf(result.difficulty).toEqualTypeOf<never>()
  expectTypeOf(result.gasLimit).toEqualTypeOf<never>()
  expectTypeOf(result.mixHash).toEqualTypeOf<never>()
  expectTypeOf(result.nonce).toEqualTypeOf<never>()
  expectTypeOf(result.uncles).toEqualTypeOf<never>()
  expectTypeOf(result.randomness).toEqualTypeOf<{
    committed: `0x${string}`
    revealed: `0x${string}`
  }>()
})
