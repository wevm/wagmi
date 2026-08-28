import { chain, config } from '@wagmi/test'
import { http } from 'viem'
import {
  getBlock,
  getTransaction,
  waitForTransactionReceipt,
} from 'viem/actions'
import { arbitrumNova, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
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

test('behavior: viem actions with multi-chain client', () => {
  const twoChainConfig = createConfig({
    chains: [arbitrumNova, optimism],
    transports: {
      [arbitrumNova.id]: http(),
      [optimism.id]: http(),
    },
  })
  const client = getClient(twoChainConfig)

  waitForTransactionReceipt(client, { hash: '0x' })
  getBlock(client)
  getTransaction(client, { hash: '0x' })
})
