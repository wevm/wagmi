import { http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { getTransactionQueryOptions } from './getTransaction.js'

const context = {} as any

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const options = getTransactionQueryOptions(config, {
    hash: '0x123',
  })
  const result = await options.queryFn(context)
  if (result.chainId === celo.id) {
    expectTypeOf(result.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
  }
  // @ts-expect-error
  result.feeCurrency
})

test('chainId', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const options = getTransactionQueryOptions(config, {
    hash: '0x123',
    chainId: celo.id,
  })
  const result = await options.queryFn(context)
  expectTypeOf(result.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
})
