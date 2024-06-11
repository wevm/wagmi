import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useTransaction } from 'wagmi'
import { celo } from 'wagmi/chains'

test('chain formatters', () => {
  const result = useTransaction()
  if (result.data?.chainId === celo.id) {
    expectTypeOf(result.data.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
  }

  const result2 = useTransaction({ chainId: celo.id })
  expectTypeOf(result2.data?.feeCurrency).toEqualTypeOf<
    `0x${string}` | null | undefined
  >()
})

test('parameters: config', async () => {
  const result = useTransaction({ config })

  if (result.data && 'feeCurrency' in result.data)
    expectTypeOf(result.data.feeCurrency).toEqualTypeOf<unknown>()
})
