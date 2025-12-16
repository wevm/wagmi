import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useChainId } from './useChainId.js'

test('default', () => {
  const chainId = useChainId()
  expectTypeOf(chainId()).toEqualTypeOf<number>()
})

test('parameters: config', () => {
  const chainId = useChainId(() => ({ config }))
  expectTypeOf(chainId()).toEqualTypeOf<1 | 456 | 10>()
})
