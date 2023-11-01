import { abi } from '@wagmi/test'
import { type Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { type UseSimulateContractParameters, useSimulateContract } from 'wagmi'
import { type SimulateContractParameters } from 'wagmi/actions'
import { celo, mainnet, optimism } from 'wagmi/chains'
import { type SimulateContractOptions } from 'wagmi/query'

import { type ChainId, config } from './config.js'

test('chain formatters', () => {
  useSimulateContract({
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useSimulateContract({
    chainId: celo.id,
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useSimulateContract({
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })

  useSimulateContract({
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
    gatewayFee: 123n,
    gatewayFeeRecipient: '0x',
  })
})

test('UseSimulateContractParameters', () => {
  type Result = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config
  >

  expectTypeOf<Result>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    chainId?: ChainId | undefined
  }>()

  type Result2 = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
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

  type Result3 = SimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result3['chainId']>().toEqualTypeOf<ChainId | undefined>()
  type Result4 = SimulateContractOptions<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result4['chainId']>().toEqualTypeOf<ChainId | undefined>()
})
