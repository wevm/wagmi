import { http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { waitForTransactionReceipt } from './waitForTransactionReceipt.js'

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })
  const result = await waitForTransactionReceipt(config, { hash: '0x123' })
  if ('feeCurrency' in result) {
    expectTypeOf(result.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
    expectTypeOf(result.gatewayFee).toEqualTypeOf<bigint | null>()
    expectTypeOf(result.gatewayFeeRecipient).toEqualTypeOf<
      `0x${string}` | null
    >()
  }
})

test('chainId', async () => {
  const config = createConfig({
    chains: [celo],
    transports: { [celo.id]: http() },
  })
  const result = await waitForTransactionReceipt(config, {
    hash: '0x123',
    chainId: celo.id,
  })
  expectTypeOf(result.feeCurrency).toEqualTypeOf<`0x${string}` | null>()
  expectTypeOf(result.gatewayFee).toEqualTypeOf<bigint | null>()
  expectTypeOf(result.gatewayFeeRecipient).toEqualTypeOf<`0x${string}` | null>()
})
