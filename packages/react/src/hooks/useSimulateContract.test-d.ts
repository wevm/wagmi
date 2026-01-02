import { abi, type config } from '@wagmi/test'
import type { Address } from 'viem'
import { assertType, expectTypeOf, test } from 'vitest'

import {
  type UseSimulateContractParameters,
  type UseSimulateContractReturnType,
  useSimulateContract,
} from './useSimulateContract.js'

test('default', () => {
  const result = useSimulateContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
  })

  expectTypeOf(result.data).toMatchTypeOf<
    | {
        result: boolean
        request: {
          chainId?: undefined
          abi: readonly [
            {
              readonly name: 'transferFrom'
              readonly type: 'function'
              readonly stateMutability: 'nonpayable'
              readonly inputs: readonly [
                { readonly type: 'address'; readonly name: 'sender' },
                { readonly type: 'address'; readonly name: 'recipient' },
                { readonly type: 'uint256'; readonly name: 'amount' },
              ]
              readonly outputs: readonly [{ type: 'bool' }]
            },
          ]
          functionName: 'transferFrom'
          args: readonly [Address, Address, bigint]
        }
      }
    | undefined
  >()
})

test('select data', () => {
  const result = useSimulateContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
    query: {
      select(data) {
        expectTypeOf(data.result).toEqualTypeOf<boolean>()
        return data.request.args
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<
    readonly [Address, Address, bigint] | undefined
  >()
})

test('UseSimulateContractParameters', () => {
  type Result = UseSimulateContractParameters<typeof abi.erc20, 'transferFrom'>
  expectTypeOf<Result>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
  }>()
})

test('UseSimulateContractReturnType', () => {
  type Result = UseSimulateContractReturnType<
    typeof abi.erc20,
    'transferFrom',
    ['0x', '0x', 123n],
    typeof config,
    1
  >
  expectTypeOf<Result['data']>().toMatchTypeOf<
    | {
        result: boolean
        request: {
          chainId: number
          abi: readonly [
            {
              readonly name: 'transferFrom'
              readonly type: 'function'
              readonly stateMutability: 'nonpayable'
              readonly inputs: readonly [
                { readonly type: 'address'; readonly name: 'sender' },
                { readonly type: 'address'; readonly name: 'recipient' },
                { readonly type: 'uint256'; readonly name: 'amount' },
              ]
              readonly outputs: readonly [{ type: 'bool' }]
            },
          ]
          functionName: 'approve' | 'transfer' | 'transferFrom'
          args: readonly [Address, Address, bigint]
        }
      }
    | undefined
  >()
})

test('overloads', () => {
  const result1 = useSimulateContract({
    address: '0x',
    abi: abi.writeOverloads,
    functionName: 'foo',
  })
  assertType<number | undefined>(result1.data?.result)

  const result2 = useSimulateContract({
    address: '0x',
    abi: abi.writeOverloads,
    functionName: 'foo',
    args: [],
  })
  assertType<number | undefined>(result2.data?.result)

  const result3 = useSimulateContract({
    address: '0x',
    abi: abi.writeOverloads,
    functionName: 'foo',
    args: ['0x'],
  })
  assertType<string | undefined>(result3.data?.result)

  const result4 = useSimulateContract({
    address: '0x',
    abi: abi.writeOverloads,
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  assertType<
    | {
        foo: `0x${string}`
        bar: `0x${string}`
      }
    | undefined
  >(result4.data?.result)
})
