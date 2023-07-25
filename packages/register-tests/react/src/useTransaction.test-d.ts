import { expectTypeOf, test } from 'vitest'
import { useTransaction } from 'wagmi'
import { celo } from 'wagmi/chains'

test('chain formatters', async () => {
  const result = useTransaction()
  if (result.data && 'feeCurrency' in result.data) {
    expectTypeOf(result.data.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
    expectTypeOf(result.data.gatewayFee).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.data.gatewayFeeRecipient).toEqualTypeOf<
      `0x${string}` | null
    >()
  }

  const result2 = useTransaction({ chainId: celo.id })
  expectTypeOf(result2.data?.feeCurrency).toEqualTypeOf<
    `0x${string}` | null | undefined
  >()
  expectTypeOf(result2.data?.gatewayFee).toEqualTypeOf<
    bigint | null | undefined
  >()
  expectTypeOf(result2.data?.gatewayFeeRecipient).toEqualTypeOf<
    `0x${string}` | null | undefined
  >()
})
