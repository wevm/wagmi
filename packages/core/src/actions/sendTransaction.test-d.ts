import { http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { celo, mainnet, tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type SendTransactionParameters,
  sendTransaction,
} from './sendTransaction.js'

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = SendTransactionParameters<typeof config>
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  sendTransaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })

  type Result2 = SendTransactionParameters<typeof config, typeof celo.id>
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  sendTransaction(config, {
    chainId: celo.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })

  type Result3 = SendTransactionParameters<typeof config, typeof mainnet.id>
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
})

test('tempo feePayer', () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )

  const tempoConfig = createConfig({
    chains: [tempoLocalnet],
    transports: { [tempoLocalnet.id]: http() },
  })

  sendTransaction(tempoConfig, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: 1n,
    feePayer: true,
  })

  sendTransaction(tempoConfig, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: 1n,
    feePayer,
  })

  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  sendTransaction(config, {
    chainId: tempoLocalnet.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: 1n,
    feePayer: true,
  })

  sendTransaction(config, {
    chainId: tempoLocalnet.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: 1n,
    feePayer,
  })

  sendTransaction(config, {
    chainId: mainnet.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: 1n,
    // @ts-expect-error
    feePayer: true,
  })

  type Result = SendTransactionParameters<typeof config, typeof mainnet.id>
  expectTypeOf<Result>().not.toMatchTypeOf<{
    feePayer?: true | typeof feePayer | undefined
  }>()
})
