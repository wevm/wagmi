import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getConnectorClientQueryOptions } from './getConnectorClient.js'

const context = {} as any

test('default', async () => {
  const options = getConnectorClientQueryOptions(config)
  const client = await options.queryFn(context)
  expectTypeOf(client.chain).toEqualTypeOf<(typeof config)['chains'][number]>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', async () => {
  const options = getConnectorClientQueryOptions(config, {
    chainId: chain.mainnet.id,
  })
  const client = await options.queryFn(context)
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})
