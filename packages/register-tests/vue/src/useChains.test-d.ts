import { useChains } from '@wagmi/vue'
import type { celo, optimism, zkSync } from '@wagmi/vue/chains'
import { expectTypeOf, test } from 'vitest'

test('default', () => {
  const chains = useChains()

  expectTypeOf(chains.value[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains.value[2]).toEqualTypeOf<typeof optimism>()
  expectTypeOf(chains.value[3]).toEqualTypeOf<typeof zkSync>()
})
