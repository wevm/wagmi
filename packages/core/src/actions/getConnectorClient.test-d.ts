import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getConnectorClient } from './getConnectorClient.js'

test('default', async () => {
  const client = await getConnectorClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<(typeof config)['chains'][number]>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', async () => {
  const client = await getConnectorClient(config, {
    chainId: chain.mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})
