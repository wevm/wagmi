import { abi } from '@wagmi/test'
import { type Address } from 'viem'
import { assertType, expectTypeOf, test } from 'vitest'

import {} from '../types/properties.js'
import {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
} from './useReadContract.js'

test('select data', () => {
  const result = useReadContract({
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

test('UseReadContractParameters', () => {
  type Result = UseReadContractParameters<typeof abi.erc20, 'balanceOf'>
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

test('UseReadContractReturnType', () => {
  type Result = UseReadContractReturnType<typeof abi.erc20, 'balanceOf'>
  expectTypeOf<Result['data']>().toEqualTypeOf<bigint | undefined>()
})

test('overloads', () => {
  const result1 = useReadContract({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data)

  const result2 = useReadContract({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useReadContract({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x'],
  })
  // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  assertType<string | undefined>(result3.data)

  const result4 = useReadContract({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  assertType<
    | {
        foo: `0x${string}`
        bar: `0x${string}`
      }
    | undefined
    // @ts-ignore – TODO: Fix https://github.com/wevm/viem/issues/1916
  >(result4.data)
})
