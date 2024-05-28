import { config } from '@wagmi/test'
import { useAccount } from '@wagmi/vue'
import { expectTypeOf, test } from 'vitest'

import type { ChainId } from './config.js'

test('default', () => {
  const result = useAccount()
  if (result.chain.value)
    expectTypeOf(result.chain.value.id).toEqualTypeOf<ChainId>()
})

test('parameters: config', async () => {
  const result = useAccount({ config })
  if (result.chain.value)
    expectTypeOf(result.chain.value.id).toEqualTypeOf<1 | 10 | 456>()
})
