import {
  type Config,
  type ReadContractErrorType,
  type ReadContractParameters,
  type ResolvedRegister,
} from '@wagmi/core'
import {
  type UnionEvaluate,
  type UnionOmit,
  type UnionPartial,
} from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
} from '@wagmi/core/query'
import { abi } from '@wagmi/test'
import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'
import { assertType, expectTypeOf, test } from 'vitest'

import {
  type ConfigParameter,
  type QueryParameter,
} from '../types/properties.js'
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

////////////////////////////////////////////////////////////////////////////////

type UseCustomReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName, args>,
> = UnionEvaluate<
  UnionPartial<
    UnionOmit<ReadContractParameters<abi, functionName, args, config>, 'abi'>
  > &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractQueryFnData<abi, functionName, args>,
      ReadContractErrorType,
      selectData,
      ReadContractQueryKey<abi, functionName, args, config>
    >
>

declare function useReadViewOverloads<
  const abi extends typeof abi.viewOverloads,
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters?: UseCustomReadContractParameters<abi, functionName, args, config>,
): UseReadContractReturnType<abi, functionName, args, selectData>

test('custom function with overloads', () => {
  const result1 = useReadViewOverloads({
    address: '0x',
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data)

  const result2 = useReadViewOverloads({
    address: '0x',
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data)

  const result3 = useReadViewOverloads({
    address: '0x',
    functionName: 'foo',
    args: ['0x'],
  })
  assertType<string | undefined>(result3.data)

  const result4 = useReadViewOverloads({
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

declare function useReadErc20<
  const abi extends typeof abi.erc20,
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters?: UseCustomReadContractParameters<abi, functionName, args, config>,
): UseReadContractReturnType<abi, functionName, args, selectData>

test('custom function', () => {
  const result1 = useReadErc20({
    address: '0x',
    functionName: 'balanceOf',
    args: ['0x'],
  })
  assertType<bigint | undefined>(result1.data)
})
