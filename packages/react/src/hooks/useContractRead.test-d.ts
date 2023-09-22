import { abi } from '@wagmi/test'
import { type Address } from 'viem'
import { assertType, expectTypeOf, test } from 'vitest'

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

test('overloads', async () => {
  const result1 = useContractRead({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data)

  const result2 = useContractRead({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useContractRead({
    address: '0x',
    abi: abi.viewOverloads,
    functionName: 'foo',
    args: ['0x'],
  })
  assertType<string | undefined>(result3.data)

  const result4 = useContractRead({
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
  >(result4.data)
})
