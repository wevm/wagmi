import { abi, config } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

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
          __mode: 'prepared'
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
          __mode: 'prepared'
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
