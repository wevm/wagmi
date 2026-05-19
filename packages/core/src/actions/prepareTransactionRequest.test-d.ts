import { accounts, config } from '@wagmi/test'
import { http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { celo, mainnet, tempoLocalnet } from 'viem/chains'
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
  }>()
  const request = await prepareTransactionRequest(config, {
    to: targetAccount,
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })
  if (request.chainId === celo.id) {
    expectTypeOf(request.chainId).toEqualTypeOf(celo.id)
    expectTypeOf(request.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
  }

  type Result2 = PrepareTransactionRequestParameters<
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  const request2 = await prepareTransactionRequest(config, {
    chainId: celo.id,
    to: targetAccount,
    value: parseEther('0.01'),
    feeCurrency: '0x',
  })
  expectTypeOf(request2.chainId).toEqualTypeOf(celo.id)
  expectTypeOf(request2.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()

  type Result3 = PrepareTransactionRequestParameters<
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
})

test('parameters: calls without to', async () => {
  await prepareTransactionRequest(config, {
    calls: [
      {
        to: targetAccount,
        data: '0xa9059cbb',
      },
    ],
  })
})

test('parameters: to or calls required', () => {
  // @ts-expect-error
  prepareTransactionRequest(config, {})
})

test('tempo transaction type', async () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )

  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  const request = await prepareTransactionRequest(config, {
    calls: [],
    chainId: tempoLocalnet.id,
    feePayer,
    type: 'tempo',
  })

  expectTypeOf(request.chainId).toEqualTypeOf<typeof tempoLocalnet.id>()
  expectTypeOf(request.type).toEqualTypeOf<'tempo'>()
})
