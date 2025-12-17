import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useConnectorClient } from './useConnectorClient.js'

test('parameters: config', async () => {
  const client = useConnectorClient(() => ({ config }))
  expectTypeOf(client.data?.chain?.id!).toEqualTypeOf<1 | 456 | 10>()

  const client2 = useConnectorClient(() => ({ config, chainId: 1 }))
  expectTypeOf(client2.data?.chain?.id!).toEqualTypeOf<1>()
})
