import { useChains } from '@wagmi/solid'
import type { celo, optimism, zksync } from '@wagmi/solid/chains'
import { expectTypeOf, test } from 'vitest'

test('default', () => {
  const chains = useChains(() => ({}))

  expectTypeOf(chains()[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains()[2]).toEqualTypeOf<typeof optimism>()
  expectTypeOf(chains()[3]).toEqualTypeOf<typeof zksync>()
})
