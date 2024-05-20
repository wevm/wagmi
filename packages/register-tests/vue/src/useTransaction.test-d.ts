import { config } from '@wagmi/test'
import { useTransaction } from '@wagmi/vue'
import { celo } from '@wagmi/vue/chains'
import { expectTypeOf, test } from 'vitest'

test('chain formatters', () => {
  const result = useTransaction()
  if (result.data?.value?.chainId === celo.id) {
    expectTypeOf(result.data.value.feeCurrency).toEqualTypeOf<
      `0x${string}` | null
    >()
  }

  const result2 = useTransaction({ chainId: celo.id })
  expectTypeOf(result2.data?.value?.feeCurrency).toEqualTypeOf<
    `0x${string}` | null | undefined
  >()
})

test('parameters: config', async () => {
  const result = useTransaction({ config })

  if (result.data && 'feeCurrency' in result.data)
    expectTypeOf(result.data.feeCurrency).toEqualTypeOf<unknown>()
})
