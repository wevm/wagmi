import { useChains } from '@wagmi/solid'
import type { celo, mainnet, optimism, zkSync } from '@wagmi/solid/chains'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

test('default', () => {
  const chains = useChains()
  expectTypeOf(chains()).toEqualTypeOf<
    readonly [typeof celo, typeof mainnet, typeof optimism, typeof zkSync]
  >()
})

test('parameters: config', () => {
  const chains = useChains(() => ({ config }))
  expectTypeOf(chains()).toEqualTypeOf<(typeof config)['chains']>()
})
