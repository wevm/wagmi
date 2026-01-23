import { useSwitchChain } from '@wagmi/solid'
import { expectTypeOf, test } from 'vitest'
import type { ChainId } from './config.js'

test('default', () => {
  const switchChain = useSwitchChain(() => ({}))

  type Result = Parameters<(typeof switchChain)['mutate']>[0]
  expectTypeOf<Result['chainId']>().toEqualTypeOf<ChainId>()
})
