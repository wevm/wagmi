import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useAccount } from 'wagmi'

import { type ChainId } from './config.js'

test('default', () => {
  const result = useAccount()
  if (result.chain) expectTypeOf(result.chain.id).toEqualTypeOf<ChainId>()
})

test('parameters: config', async () => {
  const result = useAccount({ config })
  if (result.chain) expectTypeOf(result.chain.id).toEqualTypeOf<1 | 10 | 456>()
})
