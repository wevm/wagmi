import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getClient } from './getClient.js'

test('default', () => {
  const client = getClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<(typeof config)['chains'][number]>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = getClient(config, {
    chainId: chain.mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  const client = getClient(config, {
    // @ts-expect-error
    chainId: 123456,
  })
  expectTypeOf(client).toEqualTypeOf<undefined>()
})
