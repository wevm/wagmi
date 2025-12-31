import { config } from '@wagmi/test'
import { useChainId } from '@wagmi/vue'
import { expectTypeOf, test } from 'vitest'

import type { ChainId } from './config.js'

test('default', async () => {
  const chainId = useChainId()
  expectTypeOf(chainId.value).toEqualTypeOf<ChainId>()
})

test('parameters: config', async () => {
  const chainId = useChainId({ config })
  expectTypeOf(chainId.value).toEqualTypeOf<1 | 456 | 10>()
})
