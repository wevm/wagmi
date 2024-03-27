import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { createChainId } from './createChainId.js'

test('default', async () => {
  const { chain } = createChainId()
  expectTypeOf(chain.id).toEqualTypeOf<number>()
})

test('parameters: config', async () => {
  const { chain } = createChainId(()=>({ config }))
  expectTypeOf(chain.id).toEqualTypeOf<1 | 456 | 10>()
})
