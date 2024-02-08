import { chain, config } from '@wagmi/test'
import { type Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { getChains } from './getChains.js'

test('default', async () => {
  const chains = getChains(config)
  expectTypeOf(chains[0]).toEqualTypeOf<Chain | typeof chain.mainnet>()
  expectTypeOf(chains[2]).toEqualTypeOf<Chain | typeof chain.optimism>()
  expectTypeOf(chains[3]).toEqualTypeOf<Chain | undefined>()
})
