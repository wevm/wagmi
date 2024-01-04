import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useClient } from './useClient.js'

test('default', () => {
  const client = useClient({ config })
  expectTypeOf(client.chain).toEqualTypeOf<typeof config['chains'][number]>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})

test('parameters: chainId', () => {
  const client = useClient({
    config,
    chainId: chain.mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
})
