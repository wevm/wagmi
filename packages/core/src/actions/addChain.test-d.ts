import { config } from '@wagmi/test'
import { avalanche } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { addChain } from './addChain.js'

test('return type', async () => {
  const result = await addChain(config, { chain: avalanche })
  expectTypeOf(result).toEqualTypeOf<void>()
})
