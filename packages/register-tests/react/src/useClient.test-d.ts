import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useClient } from 'wagmi'
import { mainnet } from 'wagmi/chains'

import { type ChainId } from './config.js'

test('default', () => {
  const client = useClient()
  expectTypeOf(client.chain.id).toEqualTypeOf<ChainId>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: config', () => {
  const client = useClient({ config })
  expectTypeOf(client.chain.id).toEqualTypeOf<
    typeof config['chains'][number]['id']
  >()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = useClient({
    config,
    chainId: mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  const client = useClient({
    config,
    // @ts-expect-error
    chainId: 123456,
  })
  expectTypeOf(client).toEqualTypeOf<undefined>()
})
