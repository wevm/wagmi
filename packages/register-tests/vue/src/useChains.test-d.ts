import { useChains } from '@wagmi/vue'
import { celo, optimism } from '@wagmi/vue/chains'
import { expectTypeOf, test } from 'vitest'

test('default', () => {
  const chains = useChains()

  expectTypeOf(chains.value[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains.value[2]).toEqualTypeOf<typeof optimism>()
  // @ts-expect-error
  expectTypeOf(chains.value[5]).toEqualTypeOf<undefined>()
})
