import { accounts, config } from '@wagmi/test'
import { http, parseEther } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { prepareTransactionRequestQueryOptions } from './prepareTransactionRequest.js'

const context = {} as any
const targetAccount = accounts[1]

test('default', async () => {
  const options = prepareTransactionRequestQueryOptions(config, {
    chainId: 1,
    to: '0x',
    value: parseEther('1'),
  })
  const response = await options.queryFn(context)
  const { nonce: _nonce, ...request } = response
  request.to
  request.chainId

  expectTypeOf(response.chainId).toEqualTypeOf<1>()
})

test('chain formatters', async () => {
  const config = createConfig({
    chains: [celo, mainnet],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  {
    const options = prepareTransactionRequestQueryOptions(config, {
      to: targetAccount,
      value: parseEther('0.01'),
      feeCurrency: '0x',
    })
    const request = await options.queryFn(context)
    if (request.chainId === celo.id) {
      expectTypeOf(request.chainId).toEqualTypeOf(celo.id)
      expectTypeOf(request.feeCurrency).toEqualTypeOf<
        `0x${string}` | undefined
      >()
    }
  }

  {
    const options = prepareTransactionRequestQueryOptions(config, {
      chainId: celo.id,
      to: targetAccount,
      value: parseEther('0.01'),
      feeCurrency: '0x',
    })
    const request = await options.queryFn(context)
    expectTypeOf(request.chainId).toEqualTypeOf(celo.id)
    expectTypeOf(request.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()
  }

  {
    const options = prepareTransactionRequestQueryOptions(config, {
      chainId: mainnet.id,
      to: targetAccount,
      value: parseEther('0.01'),
      // @ts-expect-error
      feeCurrency: '0x',
    })
    const request = await options.queryFn(context)
    expectTypeOf(request.chainId).toEqualTypeOf(mainnet.id)
  }
})
