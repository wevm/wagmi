import { useSwitchChain } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains'
import { expectTypeOf, test } from 'vitest'

import type { ChainId } from './config.js'

test('default', () => {
  const switchChain = useSwitchChain()

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
