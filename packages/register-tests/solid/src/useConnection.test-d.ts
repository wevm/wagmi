import { useConnection } from '@wagmi/solid'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import type { ChainId } from './config.js'

test('default', () => {
  const result = useConnection()
  const connection = result()
  if (connection.chain)
    expectTypeOf(connection.chain.id).toEqualTypeOf<ChainId>()
})

test('parameters: config', async () => {
  const result = useConnection(() => ({ config }))
  const connection = result()
  if (connection.chain)
    expectTypeOf(connection.chain.id).toEqualTypeOf<1 | 10 | 456>()
})
