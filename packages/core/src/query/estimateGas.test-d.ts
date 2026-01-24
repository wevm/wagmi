import { type Address, http, parseEther } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type EstimateGasOptions,
  estimateGasQueryOptions,
} from './estimateGas.js'

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = EstimateGasOptions<
    typeof config,
    (typeof config)['chains'][number]['id']
  >
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  estimateGasQueryOptions(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })

  type Result2 = EstimateGasOptions<typeof config, typeof celo.id>
  expectTypeOf<Result2>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  estimateGasQueryOptions(config, {
    chainId: celo.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })

  type Result3 = EstimateGasOptions<typeof config, typeof mainnet.id>
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  estimateGasQueryOptions(config, {
    chainId: mainnet.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
})
