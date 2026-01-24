import { useSwitchChain } from '@wagmi/solid'
import { mainnet } from '@wagmi/solid/chains'
import { expectTypeOf, test } from 'vitest'
import type { ChainId } from './config.js'

test('default', () => {
  const switchChain = useSwitchChain()

  switchChain.mutate(
    { chainId: 1 },
    {
      onSuccess(data) {
        expectTypeOf(data).toEqualTypeOf(mainnet)
      },
    },
  )

  type Result = Parameters<(typeof switchChain)['mutate']>[0]
  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
