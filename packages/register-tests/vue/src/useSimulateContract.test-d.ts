import type { abi } from '@wagmi/test'
import {
  type UseSimulateContractParameters,
  useSimulateContract,
} from '@wagmi/vue'
import { celo, mainnet, optimism } from '@wagmi/vue/chains'
import type { SimulateContractOptions } from '@wagmi/vue/query'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import type { ChainId, config } from './config.js'

test('chain formatters', () => {
  const { data } = useSimulateContract({
    feeCurrency: '0x',
  })
  if (data.value && data.value.chainId === celo.id) {
    expectTypeOf(data.value.request.feeCurrency).toEqualTypeOf<
      `0x${string}` | undefined
    >()
  }

  const { data: data2 } = useSimulateContract({
    chainId: celo.id,
    feeCurrency: '0x',
  })
  if (data2.value) {
    expectTypeOf(data2.value.request.feeCurrency).toEqualTypeOf<
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
  expectTypeOf(res.value?.functionName).toEqualTypeOf<
    'approve' | 'transfer' | 'transferFrom' | undefined
  >()
  if (res.value?.args) {
    expectTypeOf(res.value.args[0]).toEqualTypeOf<Address>()
    expectTypeOf(res.value.args[1]).toEqualTypeOf<Address>()
    expectTypeOf(res.value.args[2]).toEqualTypeOf<bigint>()
  }
  expectTypeOf(res.value?.chainId).toEqualTypeOf<ChainId | undefined>()

  type Result2 = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf(({} as Result2).value?.chainId).toEqualTypeOf<
    ChainId | undefined
  >()

  type Result3 = UseSimulateContractParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf(({} as Result3).value?.chainId).toEqualTypeOf<
    ChainId | undefined
  >()

  type Result4 = SimulateContractOptions<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result4['chainId']>().toEqualTypeOf<ChainId | undefined>()
})
