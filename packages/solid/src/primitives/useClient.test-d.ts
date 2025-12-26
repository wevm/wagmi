import { chain, config } from '@wagmi/test'
import type { Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useClient } from './useClient.js'

test('default', () => {
  const client = useClient(() => ({ config }))
  expectTypeOf(client().chain).toEqualTypeOf<
    (typeof config)['chains'][number]
  >()
  expectTypeOf(client().transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = useClient(() => ({
    config,
    chainId: chain.mainnet.id,
  }))
  expectTypeOf(client().chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client().chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client().transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  {
    const client = useClient(() => ({ chainId: 123456 }))
    const _client = client()
    if (_client) {
      expectTypeOf(_client.chain).toEqualTypeOf<Chain>()
      expectTypeOf(_client.transport.type).toEqualTypeOf<string>()
    } else {
      expectTypeOf(_client).toEqualTypeOf<undefined>()
    }
  }

  // @ts-expect-error
  const client = useClient(() => ({
    config,
    chainId: 123456,
  }))
  expectTypeOf(client()).toEqualTypeOf<undefined>()
})
