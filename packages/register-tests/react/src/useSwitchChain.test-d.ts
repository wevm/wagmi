import { expectTypeOf, test } from 'vitest'
import { useSwitchChain } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import type { ChainId } from './config.js'

test('default', () => {
  const { mutate } = useSwitchChain()

  mutate(
    { chainId: 1 },
    {
      onSuccess(data) {
        expectTypeOf(data).toEqualTypeOf(mainnet)
      },
    },
  )

  type Result = Parameters<typeof mutate>[0]
  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
