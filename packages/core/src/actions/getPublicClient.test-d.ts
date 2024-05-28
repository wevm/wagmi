import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { getPublicClient } from './getPublicClient.js'

test('default', () => {
  const client = getPublicClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<(typeof config)['chains'][number]>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = getPublicClient(config, {
    chainId: chain.mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  const client = getPublicClient(config, {
    // @ts-expect-error
    chainId: 123456,
  })
  expectTypeOf(client).toEqualTypeOf<undefined>()
})
