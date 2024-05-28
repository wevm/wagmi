import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { watchClient } from './watchClient.js'

test('default', () => {
  watchClient(config, {
    onChange(client) {
      expectTypeOf(client.chain).toEqualTypeOf<
        (typeof config)['chains'][number]
      >()
      expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
    },
  })
})
