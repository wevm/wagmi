import { expectTypeOf, test } from 'vitest'
import { useChains } from 'wagmi'
import { type Chain, celo, optimism } from 'wagmi/chains'

test('default', () => {
  const chains = useChains()

  expectTypeOf(chains[0]).toEqualTypeOf<Chain | typeof celo>()
  expectTypeOf(chains[2]).toEqualTypeOf<Chain | typeof optimism>()
  expectTypeOf(chains[5]).toEqualTypeOf<Chain | undefined>()
})
