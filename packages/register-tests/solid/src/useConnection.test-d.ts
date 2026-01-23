import { type Connector, useConnection } from '@wagmi/solid'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

test('default', () => {
  const result = useConnection(() => ({}))
  const connection = result()

  if (connection.status === 'connected') {
    expectTypeOf(connection.address).toEqualTypeOf<Address>()
    expectTypeOf(connection.connector).toEqualTypeOf<Connector>()
  }
})
