import { expectTypeOf, test } from 'vitest'
import { useSwitchChain } from 'wagmi'
import { type celo, mainnet, type optimism } from 'wagmi/chains'

import type { ChainId, config } from './config.js'

test('default', () => {
  const { chains, switchChain } = useSwitchChain()

  expectTypeOf(chains).toEqualTypeOf<(typeof config)['chains']>()
  expectTypeOf(chains[0]).toEqualTypeOf<typeof celo>()
  expectTypeOf(chains[2]).toEqualTypeOf<typeof optimism>()

  switchChain(
    { chainId: 1 },
    {
      onSuccess(data) {
        expectTypeOf(data).toEqualTypeOf(mainnet)
      },
    },
  )

  type Result = Parameters<typeof switchChain>[0]
  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
