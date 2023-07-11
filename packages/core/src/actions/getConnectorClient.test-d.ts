import { config, testChains } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getConnectorClient } from './getConnectorClient.js'

test('default', async () => {
  const client = await getConnectorClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<typeof config['chains'][number]>()
})

test('chainId', async () => {
  const client = await getConnectorClient(config, {
    chainId: testChains.anvil.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof testChains.anvil>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof testChains.anvilTwo>()
})
