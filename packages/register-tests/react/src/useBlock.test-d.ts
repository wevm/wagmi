import { expectTypeOf, test } from 'vitest'
import { useBlock } from 'wagmi'
import { celo } from 'wagmi/chains'

test('chain formatters', () => {
  const result = useBlock()

  if (result.data) expectTypeOf(result.data.difficulty).toEqualTypeOf<bigint>()

  if (result.data?.chainId === celo.id) {
    expectTypeOf(result.data.difficulty).toEqualTypeOf<never>()
    expectTypeOf(result.data.gasLimit).toEqualTypeOf<never>()
    expectTypeOf(result.data.mixHash).toEqualTypeOf<never>()
    expectTypeOf(result.data.nonce).toEqualTypeOf<never>()
    expectTypeOf(result.data.uncles).toEqualTypeOf<never>()
    expectTypeOf(result.data.randomness).toEqualTypeOf<{
      committed: `0x${string}`
      revealed: `0x${string}`
    }>()
  }

  const result2 = useBlock({ chainId: celo.id })
  if (result2.data) {
    expectTypeOf(result2.data.difficulty).toEqualTypeOf<never>()
    expectTypeOf(result2.data.gasLimit).toEqualTypeOf<never>()
    expectTypeOf(result2.data.mixHash).toEqualTypeOf<never>()
    expectTypeOf(result2.data.nonce).toEqualTypeOf<never>()
    expectTypeOf(result2.data.uncles).toEqualTypeOf<never>()
    expectTypeOf(result2.data.randomness).toEqualTypeOf<{
      committed: `0x${string}`
      revealed: `0x${string}`
    }>()
  }
})
