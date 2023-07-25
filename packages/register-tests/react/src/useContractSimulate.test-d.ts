import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { type UseContractSimulateParameters, useContractSimulate } from 'wagmi'
import { celo, mainnet, optimism } from 'wagmi/chains'

import type { ChainId } from './config.js'

test('chain formatters', async () => {
  useContractSimulate({
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useContractSimulate({
    chainId: celo.id,
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useContractSimulate({
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useContractSimulate({
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })
})

test('UseContractSimulateParameters', () => {
  type Result = UseContractSimulateParameters<typeof abi.erc20, 'transferFrom'>

  expectTypeOf<Result>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    chainId?: ChainId | undefined
  }>()

  type Result2 = UseContractSimulateParameters<
    typeof abi.erc20,
    'transferFrom',
    typeof celo.id
  >
  expectTypeOf<Result2['chainId']>().toEqualTypeOf<ChainId | undefined>()
  expectTypeOf<Result2['feeCurrency']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
  expectTypeOf<Result2['gatewayFee']>().toEqualTypeOf<bigint | undefined>()
  expectTypeOf<Result2['gatewayFeeRecipient']>().toEqualTypeOf<
    `0x${string}` | undefined
  >()
})
