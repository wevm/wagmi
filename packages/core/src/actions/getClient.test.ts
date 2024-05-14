import { chain, config } from '@wagmi/test'
import { expect, expectTypeOf, test } from 'vitest'

import { http } from 'viem'
import { waitForTransactionReceipt } from '../actions/waitForTransactionReceipt.js'
import { createConfig } from '../createConfig.js'
import { optimism, optimismSepolia } from '../exports/chains.js'
import { getClient } from './getClient.js'

test('default', () => {
  expect(getClient(config)).toBeDefined()
})

test('behavior: unconfigured chain', () => {
  expect(
    getClient(config, {
      // @ts-expect-error
      chainId: 123456,
    }),
  ).toBeUndefined()
})

test('default', () => {
  const client = getClient(config)
  expectTypeOf(client.chain).toEqualTypeOf<typeof config['chains'][number]>()
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

test('behavior: viem actions', () => {
  const viemActionChains = [optimismSepolia, optimism] as const
  const viemActionsTransports = {
    [optimismSepolia.id]: http(),
    [optimism.id]: http(),
  } as const
  const configObject = {
    chains: viemActionChains,
    transports: viemActionsTransports,
  } as const

  const config = createConfig(configObject)

  const client = getClient(config)

  waitForTransactionReceipt(
    {
      ...config,
      client,
    },
    { hash: '0x…' },
  )
})

test('behavior: unconfigured chain', () => {
  const client = getClient(config, {
    // @ts-expect-error
    chainId: 123456,
  })
  expectTypeOf(client).toEqualTypeOf<undefined>()
})
