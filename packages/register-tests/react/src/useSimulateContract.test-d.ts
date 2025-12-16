import { type abi, config as testConfig } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { type UseSimulateContractParameters, useSimulateContract } from 'wagmi'
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
  const res = {} as Result
  expectTypeOf(res.functionName).toEqualTypeOf<
    'approve' | 'transfer' | 'transferFrom' | undefined
  >()
  if (res.args) {
    expectTypeOf(res.args[0]).toEqualTypeOf<Address>()
    expectTypeOf(res.args[1]).toEqualTypeOf<Address>()
    expectTypeOf(res.args[2]).toEqualTypeOf<bigint>()
  }
  expectTypeOf(res.chainId).toEqualTypeOf<ChainId | undefined>()

  type Result2 = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  const res2 = {} as Result2
  expectTypeOf(res2.chainId).toEqualTypeOf<ChainId | undefined>()
  expectTypeOf(res2.feeCurrency).toEqualTypeOf<`0x${string}` | undefined>()

  type Result3 = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf(({} as Result3).chainId).toEqualTypeOf<ChainId | undefined>()

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
