import { expectTypeOf, test } from 'vitest'
import { useSwitchChain } from 'wagmi'
import { type Chain, celo, mainnet, optimism } from 'wagmi/chains'

import { type ChainId, config } from './config.js'

test('default', () => {
  const { chains, switchChain } = useSwitchChain()

  expectTypeOf(chains).toEqualTypeOf<
    typeof config['chains'] | readonly [Chain, ...Chain[]]
  >()
  expectTypeOf(chains[0]).toEqualTypeOf<Chain | typeof celo>()
  expectTypeOf(chains[2]).toEqualTypeOf<Chain | typeof optimism>()
  expectTypeOf(chains[5]).toEqualTypeOf<Chain | undefined>()

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
