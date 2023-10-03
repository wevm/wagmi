import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ReadContractData } from '@wagmi/core/query'
import { abi } from '@wagmi/test'
import {
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'
import { assertType, expectTypeOf, test } from 'vitest'

import type { UnionOmit } from '@wagmi/core/internal'
import {
  type UseReadContractParameters,
  type UseReadContractReturnType,
  useReadContract,
} from './useReadContract.js'

test('select data', async () => {
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

test('overloads', async () => {
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
  >(result4.data)
})

declare function useViewOverloads<
  functionName extends ContractFunctionName<
    typeof abi.viewOverloads,
    'pure' | 'view'
  >,
  args extends ContractFunctionArgs<
    typeof abi.viewOverloads,
    'pure' | 'view',
    functionName
  >,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<typeof abi.viewOverloads, functionName, args>,
>(
  parameters?: UseReadContractParameters<
    typeof abi.viewOverloads,
    functionName,
    args,
    config,
    selectData
  >,
): UseReadContractReturnType<
  typeof abi.viewOverloads,
  functionName,
  args,
  selectData
>

test('fixed abi', () => {
  const result1 = useViewOverloads({
    address: '0x',
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data)

  const result2 = useViewOverloads({
    address: '0x',
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useViewOverloads({
    address: '0x',
    functionName: 'foo',
    args: ['0x'],
  })
  assertType<string | undefined>(result3.data)

  const result4 = useViewOverloads({
    address: '0x',
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

declare function useViewOverloadsFoo<
  args extends ContractFunctionArgs<
    typeof abi.viewOverloads,
    'pure' | 'view',
    'foo'
  >,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<typeof abi.viewOverloads, 'foo', args>,
>(
  parameters?: UnionOmit<
    UseReadContractParameters<
      typeof abi.viewOverloads,
      'foo',
      args,
      config,
      selectData
    >,
    'abi' | 'functionName'
  >,
): UseReadContractReturnType<typeof abi.viewOverloads, 'foo', args, selectData>

test('fixed abi and functionName', () => {
  const result1 = useViewOverloadsFoo({
    address: '0x',
  })
  assertType<number | undefined>(result1.data)

  const result2 = useViewOverloadsFoo({
    address: '0x',
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useViewOverloadsFoo({
    address: '0x',
    args: ['0x'],
  })
  assertType<string | undefined>(result3.data)

  const result4 = useViewOverloadsFoo({
    address: '0x',
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
