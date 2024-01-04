import { http, parseEther } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { type EstimateGasParameters, estimateGas } from './estimateGas.js'

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = EstimateGasParameters<typeof config>
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  estimateGas(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })

  type Result2 = EstimateGasParameters<typeof config, typeof celo.id>
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  estimateGas(config, {
    chainId: celo.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })

  type Result3 = EstimateGasParameters<typeof config, typeof mainnet.id>
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  estimateGas(config, {
    chainId: mainnet.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
})
