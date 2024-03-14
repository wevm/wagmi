import { accounts, config } from '@wagmi/test'
import { http, parseEther } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type PrepareTransactionRequestParameters,
  prepareTransactionRequest,
} from './prepareTransactionRequest.js'

const targetAccount = accounts[1]

test('default', async () => {
  const response = await prepareTransactionRequest(config, {
    chainId: 1,
    to: '0x',
    value: parseEther('1'),
  })
  const { nonce: _nonce, ...request } = response
  request.to
  request.chainId

  expectTypeOf(response).toMatchTypeOf<{
    chainId: 1
  }>()
})

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
  const request = await prepareTransactionRequest(config, {
    to: targetAccount,
    value: parseEther('0.01'),
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
  if (request.chainId === celo.id) {
    expectTypeOf(request.chainId).toEqualTypeOf(celo.id)
    expectTypeOf(request.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
    expectTypeOf(request.gatewayFee).toEqualTypeOf<bigint | undefined>()
    expectTypeOf(request.gatewayFeeRecipient).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }

  type Result2 = PrepareTransactionRequestParameters<
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
  const request2 = await prepareTransactionRequest(config, {
    chainId: celo.id,
    to: targetAccount,
    value: parseEther('0.01'),
    feeCurrency: '0x',
    gatewayFee: 100n,
    gatewayFeeRecipient: '0x',
  })
  expectTypeOf(request2.chainId).toEqualTypeOf(celo.id)
  expectTypeOf(request2.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
  expectTypeOf(request2.gatewayFee).toEqualTypeOf<bigint | undefined>()
  expectTypeOf(request2.gatewayFeeRecipient).toEqualTypeOf<
    `0x${string}` | undefined
  >()

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
