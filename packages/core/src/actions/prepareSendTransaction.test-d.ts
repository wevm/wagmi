import { http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../config.js'
import {
  type PrepareSendTransactionParameters,
  prepareSendTransaction,
} from './prepareSendTransaction.js'

test('chain formatters', async () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = PrepareSendTransactionParameters<typeof config>
  expectTypeOf<Result>().toMatchTypeOf<
    { chainId?: typeof celo.id | typeof mainnet.id | undefined } & {
      feeCurrency?: `0x${string}` | undefined
      gatewayFee?: bigint | undefined
      gatewayFeeRecipient?: `0x${string}` | undefined
    }
  >()
  const result = await prepareSendTransaction(config, {
    to: '0x',
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
  expectTypeOf(result.chainId).toMatchTypeOf<
    typeof celo.id | typeof mainnet.id | undefined
  >()
  if ('feeCurrency' in result) {
    expectTypeOf(result.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
    expectTypeOf(result.gatewayFee).toEqualTypeOf<bigint | undefined>()
    expectTypeOf(result.gatewayFeeRecipient).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }

  type Result2 = PrepareSendTransactionParameters<typeof config, typeof celo.id>
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  const result2 = await prepareSendTransaction(config, {
    to: '0x',
    chainId: celo.id,
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
  expectTypeOf(result2.chainId).toMatchTypeOf(celo.id)
  expectTypeOf(result2.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
  expectTypeOf(result2.gatewayFee).toEqualTypeOf<bigint | undefined>()
  expectTypeOf(result2.gatewayFeeRecipient).toEqualTypeOf<
    `0x${string}` | undefined
  >()

  type Result3 = PrepareSendTransactionParameters<
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  const result3 = await prepareSendTransaction(config, {
    chainId: mainnet.id,
    to: '0x',
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
  expectTypeOf(result3.chainId).toMatchTypeOf(mainnet.id)
})
