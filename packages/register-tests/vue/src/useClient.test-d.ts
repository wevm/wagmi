import { type chain, config } from '@wagmi/test'
import { useClient } from '@wagmi/vue'
import { mainnet } from '@wagmi/vue/chains'
import { expectTypeOf, test } from 'vitest'

import type { ChainId } from './config.js'

test('default', () => {
  const client = useClient()
  expectTypeOf(client.value.chain.id).toEqualTypeOf<ChainId>()
  expectTypeOf(client.value.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: config', () => {
  const client = useClient({ config })
  expectTypeOf(client.value.chain.id).toEqualTypeOf<
    (typeof config)['chains'][number]['id']
  >()
  expectTypeOf(client.value.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = useClient({
    config,
    chainId: mainnet.id,
  })
  expectTypeOf(client.value.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.value.transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  const client = useClient({
    config,
    // @ts-expect-error
    chainId: 123456,
  })
  expectTypeOf(client.value).toEqualTypeOf<undefined>()
})
