import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

import {
  type UseContractReadParameters,
  type UseContractReadReturnType,
  useContractRead,
} from './useContractRead.js'

test('select data', async () => {
  const result = useContractRead({
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<bigint>()
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})

test('UseContractReadParameters', () => {
  type Result = UseContractReadParameters<typeof abi.erc20, 'balanceOf'>
  expectTypeOf<Pick<Result, 'args' | 'functionName'>>().toEqualTypeOf<{
    functionName?:
      | 'symbol'
      | 'name'
      | 'allowance'
      | 'balanceOf'
      | 'decimals'
      | 'totalSupply'
      | undefined
    args?: readonly [Address] | undefined
  }>()
})

test('UseContractReadReturnType', () => {
  type Result = UseContractReadReturnType<typeof abi.erc20, 'balanceOf'>
  expectTypeOf<Result['data']>().toEqualTypeOf<bigint | undefined>()
})
