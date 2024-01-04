import { expectTypeOf, test } from 'vitest'
import { useSwitchChain } from 'wagmi'
import { mainnet } from 'wagmi/chains'

import { type ChainId } from './config.js'

test('default', async () => {
  const { switchChain } = useSwitchChain()

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
