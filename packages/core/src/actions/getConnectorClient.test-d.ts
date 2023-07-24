import { config, testChains } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getConnectorClient } from './getConnectorClient.js'

test('default', async () => {
  const client = await getConnectorClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<typeof config['chains'][number]>()
})

test('chainId', async () => {
  const client = await getConnectorClient(config, {
    chainId: testChains.mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof testChains.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof testChains.mainnet2>()
})
