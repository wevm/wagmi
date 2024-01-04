import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useChainId } from 'wagmi'

import { type ChainId } from './config.js'

test('default', async () => {
  const chainId = useChainId()
  expectTypeOf(chainId).toEqualTypeOf<ChainId>()
})

test('parameters: config', async () => {
  const chainId = useChainId({ config })
  expectTypeOf(chainId).toEqualTypeOf<1 | 456 | 10>()
})
