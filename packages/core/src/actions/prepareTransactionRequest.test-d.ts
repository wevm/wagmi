import { accounts } from '@wagmi/test'
import { http, parseEther } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type PrepareTransactionRequestParameters,
  prepareTransactionRequest,
} from './prepareTransactionRequest.js'

const targetAccount = accounts[1]

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = PrepareTransactionRequestParameters<typeof config>
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  prepareTransactionRequest(config, {
    to: targetAccount,
    value: parseEther('0.01'),
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })

  type Result2 = PrepareTransactionRequestParameters<
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  prepareTransactionRequest(config, {
    to: targetAccount,
    value: parseEther('0.01'),
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })

  type Result3 = PrepareTransactionRequestParameters<
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  prepareTransactionRequest(config, {
    chainId: mainnet.id,
    to: targetAccount,
    value: parseEther('0.01'),
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
})
