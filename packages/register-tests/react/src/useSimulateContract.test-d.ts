import { type abi, config as testConfig } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { type UseSimulateContractParameters, useSimulateContract } from 'wagmi'
import type { SimulateContractParameters } from 'wagmi/actions'
import { celo, mainnet, optimism } from 'wagmi/chains'
import type { SimulateContractOptions } from 'wagmi/query'

import type { ChainId, config } from './config.js'

test('chain formatters', () => {
  const { data } = useSimulateContract({
    feeCurrency: '0x',
  })
  if (data && data.chainId === celo.id) {
    expectTypeOf(data.request.feeCurrency).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }

  const { data: data2 } = useSimulateContract({
    chainId: celo.id,
    feeCurrency: '0x',
  })
  if (data2) {
    expectTypeOf(data2.request.feeCurrency).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }

  useSimulateContract({
    chainId: mainnet.id,
    // @ts-expect-error
    feeCurrency: '0x',
  })

  useSimulateContract({
    chainId: optimism.id,
    // @ts-expect-error
    feeCurrency: '0x',
  })
})

test('UseSimulateContractParameters', () => {
  type Result = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config
  >

  expectTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    chainId?: ChainId | undefined
  }>().toMatchTypeOf<Result>()

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

test('parameters: config', async () => {
  useSimulateContract({
    config: testConfig,
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
