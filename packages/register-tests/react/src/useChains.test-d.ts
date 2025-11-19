import { expectTypeOf, test } from 'vitest'
import { useChains } from 'wagmi'
import type { celo, optimism, zkSync } from 'wagmi/chains'

test('default', () => {
  const chains = useChains()

  expectTypeOf(chains[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains[2]).toEqualTypeOf<typeof optimism>()
  expectTypeOf(chains[3]).toEqualTypeOf<typeof zkSync>()
})
