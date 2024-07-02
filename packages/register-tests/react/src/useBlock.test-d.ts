import { expectTypeOf, test } from 'vitest'
import { useBlock } from 'wagmi'
import { celo } from 'wagmi/chains'

test('chain formatters', () => {
  const result = useBlock()

  if (result.data)
    expectTypeOf(result.data.difficulty).toEqualTypeOf<bigint | undefined>()

  if (result.data?.chainId === celo.id) {
    expectTypeOf(result.data.difficulty).toEqualTypeOf<bigint | undefined>()
    expectTypeOf(result.data.gasLimit).toEqualTypeOf<bigint | undefined>()
    expectTypeOf(result.data.mixHash).toEqualTypeOf<undefined>()
    expectTypeOf(result.data.nonce).toEqualTypeOf<`0x${string}`>()
    expectTypeOf(result.data.uncles).toEqualTypeOf<undefined>()
    expectTypeOf(result.data.randomness).toEqualTypeOf<
      | {
          committed: `0x${string}`
          revealed: `0x${string}`
        }
      | undefined
    >()
  }

  const result2 = useBlock({ chainId: celo.id })
  if (result2.data) {
    expectTypeOf(result2.data.difficulty).toEqualTypeOf<bigint | undefined>()
    expectTypeOf(result2.data.gasLimit).toEqualTypeOf<bigint | undefined>()
    expectTypeOf(result2.data.mixHash).toEqualTypeOf<undefined>()
    expectTypeOf(result2.data.nonce).toEqualTypeOf<`0x${string}`>()
    expectTypeOf(result2.data.uncles).toEqualTypeOf<undefined>()
    expectTypeOf(result2.data.randomness).toEqualTypeOf<
      | {
          committed: `0x${string}`
          revealed: `0x${string}`
        }
      | undefined
    >()
  }
})
