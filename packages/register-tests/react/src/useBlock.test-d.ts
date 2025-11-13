import type { Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useBlock } from 'wagmi'
import { celo } from 'wagmi/chains'

test('chain formatters', () => {
  const result = useBlock()

  if (result.data) expectTypeOf(result.data.difficulty).toEqualTypeOf<bigint>()

  if (result.data?.chainId === celo.id) {
    expectTypeOf(result.data.difficulty).toEqualTypeOf<bigint>()
    expectTypeOf(result.data.gasLimit).toEqualTypeOf<bigint>()
    expectTypeOf(result.data.mixHash).toEqualTypeOf<Hex>()
    expectTypeOf(result.data.nonce).toEqualTypeOf<`0x${string}`>()
    expectTypeOf(result.data.uncles).toEqualTypeOf<Hex[]>()
  }

  const result2 = useBlock({ chainId: celo.id })
  if (result2.data) {
    expectTypeOf(result2.data.difficulty).toEqualTypeOf<bigint>()
    expectTypeOf(result2.data.gasLimit).toEqualTypeOf<bigint>()
    expectTypeOf(result2.data.mixHash).toEqualTypeOf<Hex>()
    expectTypeOf(result2.data.nonce).toEqualTypeOf<`0x${string}`>()
    expectTypeOf(result2.data.uncles).toEqualTypeOf<Hex[]>()
  }
})
