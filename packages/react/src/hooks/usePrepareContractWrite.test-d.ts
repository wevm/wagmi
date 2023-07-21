import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

import {
  type UsePrepareContractWriteParameters,
  type UsePrepareContractWriteReturnType,
  usePrepareContractWrite,
} from './usePrepareContractWrite.js'

test('default', () => {
  const result = usePrepareContractWrite({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 123,
  })

  expectTypeOf(result.data).toMatchTypeOf<
    | {
        mode: 'prepared'
        chainId: number
        result: boolean
        request: {
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
  const result = usePrepareContractWrite({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    select(data) {
      expectTypeOf(data.result).toEqualTypeOf<boolean>()
      return data.request.args
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<
    readonly [Address, Address, bigint] | undefined
  >()
})

test('UsePrepareContractWriteParameters', () => {
  type Result = UsePrepareContractWriteParameters<
    typeof abi.erc20,
    'transferFrom'
  >
  expectTypeOf<Result>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
  }>()
})

test('UsePrepareContractWriteReturnType', () => {
  type Result = UsePrepareContractWriteReturnType<
    typeof abi.erc20,
    'transferFrom',
    123
  >
  expectTypeOf<Result['data']>().toMatchTypeOf<
    | {
        mode: 'prepared'
        chainId: number
        result: boolean
        request: {
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
