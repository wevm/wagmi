import { chain, config } from '@wagmi/test'
import { type Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { createClient } from './createClient.js'

test('default', () => {
  const { data } = createClient(()=>({ config }))
  expectTypeOf(data.client.chain).toEqualTypeOf<typeof config['chains'][number]>()
  expectTypeOf(data.client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const { data } = createClient(()=>({
    config,
    chainId: chain.mainnet.id,
  }))
  expectTypeOf(data.client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(data.client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(data.client.transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  {
    const { data } = createClient(()=>({ chainId: 123456 }))
    if (data.client) {
      expectTypeOf(data.client.chain).toEqualTypeOf<Chain>()
      expectTypeOf(data.client.transport.type).toEqualTypeOf<string>()
    } else {
      expectTypeOf(data.client).toEqualTypeOf<undefined>()
    }
  }

  const { data } = createClient(()=>({
    config,
    // @ts-expect-error
    chainId: 123456,
  }))
  expectTypeOf(data.client).toEqualTypeOf<undefined>()
})
