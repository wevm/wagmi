import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useConnection } from 'wagmi'

import type { ChainId } from './config.js'

test('default', () => {
  const result = useConnection()
  if (result.chain) expectTypeOf(result.chain.id).toEqualTypeOf<ChainId>()
})

test('parameters: config', async () => {
  const result = useConnection({ config })
  if (result.chain) expectTypeOf(result.chain.id).toEqualTypeOf<1 | 10 | 456>()
})
