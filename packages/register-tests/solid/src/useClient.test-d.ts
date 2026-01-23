import { useClient } from '@wagmi/solid'
import { mainnet } from '@wagmi/solid/chains'
import { type chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import type { ChainId } from './config.js'

test('default', () => {
  const client = useClient()
  expectTypeOf(client().chain.id).toEqualTypeOf<ChainId>()
  expectTypeOf(client().transport.type).toEqualTypeOf<'http'>()
})

test('parameters: config', () => {
  const client = useClient(() => ({ config }))
  expectTypeOf(client().chain.id).toEqualTypeOf<
    (typeof config)['chains'][number]['id']
  >()
  expectTypeOf(client().transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = useClient(() => ({
    config,
    chainId: mainnet.id,
  }))
  expectTypeOf(client().chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client().transport.type).toEqualTypeOf<'http'>()
})

test('behavior: unconfigured chain', () => {
  const client = useClient(
    // @ts-expect-error chainId 123456 is not configured
    () => ({
      config,
      chainId: 123456,
    }),
  )
  expectTypeOf(client()).toEqualTypeOf<undefined>()
})
