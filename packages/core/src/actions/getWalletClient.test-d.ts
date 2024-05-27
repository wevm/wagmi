import { chain, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import type { Account } from 'viem'
import { getWalletClient } from './getWalletClient.js'

test('default', async () => {
  const client = await getWalletClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<(typeof config)['chains'][number]>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
  expectTypeOf(client.account).toEqualTypeOf<Account>()
})

test('parameters: chainId', async () => {
  const client = await getWalletClient(config, {
    chainId: chain.mainnet.id,
  })
  expectTypeOf(client.chain).toEqualTypeOf<typeof chain.mainnet>()
  expectTypeOf(client.chain).not.toEqualTypeOf<typeof chain.mainnet2>()
  expectTypeOf(client.transport.type).toEqualTypeOf<'http'>()
  expectTypeOf(client.account).toEqualTypeOf<Account>()
})
