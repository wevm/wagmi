import { type chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getChains } from './getChains.js'

test('default', async () => {
  const chains = getChains(config)
  expectTypeOf(chains[0]).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(chains[2]).toEqualTypeOf<typeof chain.optimism>()
})
