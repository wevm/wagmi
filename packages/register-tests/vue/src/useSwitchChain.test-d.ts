import { useSwitchChain } from '@wagmi/vue'
import { type celo, mainnet, type optimism } from '@wagmi/vue/chains'
import { expectTypeOf, test } from 'vitest'

import type { ChainId, config } from './config.js'

test('default', () => {
  const switchChain = useSwitchChain()

  const chains = switchChain.chains.value

  expectTypeOf(chains).toEqualTypeOf<(typeof config)['chains']>()
  expectTypeOf(chains[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains[2]).toEqualTypeOf<typeof optimism>()

  switchChain.switchChain(
    { chainId: 1 },
    {
      onSuccess(data) {
        expectTypeOf(data).toEqualTypeOf(mainnet)
      },
    },
  )

  type Result = Parameters<(typeof switchChain)['switchChain']>[0]
  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
