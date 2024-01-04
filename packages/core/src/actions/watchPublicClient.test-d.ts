import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { watchPublicClient } from './watchPublicClient.js'

test('default', () => {
  watchPublicClient(config, {
    onChange(client) {
      expectTypeOf(client.chain).toEqualTypeOf<
        typeof config['chains'][number]
      >()
      expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
    },
  })
})
