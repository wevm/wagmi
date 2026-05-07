import { abi } from '@wagmi/test'
import { useReadContract } from '@wagmi/vue'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { computed } from 'vue'

import type { DeepUnwrapRef } from '../../../vue/src/types/ref.js'
import type { ChainId } from './config.js'

test('repro: #5091 computed args', () => {
  useReadContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<bigint>()
        return data
      },
    },
  })

  const typedArgs = computed<readonly [Address]>(() => ['0x'])
  const typedResult = useReadContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: typedArgs,
  })
  expectTypeOf(typedResult.data.value).toEqualTypeOf<bigint | undefined>()

  const untypedArgs = computed(() => ['0x'])
  const untypedResult = useReadContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: untypedArgs,
  })
  expectTypeOf(untypedResult.data.value).toEqualTypeOf<bigint | undefined>()
})

test('UseReadContractParameters', () => {
  type Result = DeepUnwrapRef<
    NonNullable<
      Parameters<
        typeof useReadContract<typeof abi.erc20, 'balanceOf', ['0x']>
      >[0]
    >
  >

  expectTypeOf<Result>().toMatchTypeOf<{
    functionName?:
      | 'symbol'
      | 'name'
      | 'allowance'
      | 'balanceOf'
      | 'decimals'
      | 'totalSupply'
      | undefined
    args?: readonly [Address] | undefined
    chainId?: ChainId | undefined
  }>()
})
