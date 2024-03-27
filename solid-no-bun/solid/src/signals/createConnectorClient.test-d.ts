import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { createConnectorClient } from './createConnectorClient.js'

test('parameters: config', async () => {
  const client = createConnectorClient(()=>({ config }))
  expectTypeOf(client.data?.chain?.id!).toEqualTypeOf<1 | 456 | 10>()

  const client2 = createConnectorClient(()=>({ config, chainId: 1 }))
  expectTypeOf(client2.data?.chain?.id!).toEqualTypeOf<1>()
})
