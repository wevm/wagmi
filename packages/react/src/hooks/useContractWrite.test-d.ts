import { type SendTransactionError } from '@wagmi/core'
import { abi } from '@wagmi/test'
import { type Abi, type Address, type Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useContractWrite } from './useContractWrite.js'
import { usePrepareContractWrite } from './usePrepareContractWrite.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, write, variables } = useContractWrite({
    onMutate(variables) {
      if (variables.mode === 'prepared')
        expectTypeOf(variables).toMatchTypeOf<{
          mode: 'prepared'
          chainId?: number | undefined
          request: {
            abi: Abi
            functionName: string
            args?: readonly unknown[] | undefined
          }
        }>()
      else
        expectTypeOf(variables).toMatchTypeOf<{
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<SendTransactionError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

      if (variables.mode === 'prepared')
        expectTypeOf(variables).toMatchTypeOf<{
          mode: 'prepared'
          chainId?: number | undefined
          request: {
            abi: Abi
            functionName: string
            args?: readonly unknown[] | undefined
          }
        }>()
      else
        expectTypeOf(variables).toMatchTypeOf<{
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<{ hash: Hash }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

      if (variables.mode === 'prepared')
        expectTypeOf(variables).toMatchTypeOf<{
          mode: 'prepared'
          chainId?: number | undefined
          request: {
            abi: Abi
            functionName: string
            args?: readonly unknown[] | undefined
          }
        }>()
      else
        expectTypeOf(variables).toMatchTypeOf<{
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<{ hash: Hash } | undefined>()
      expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

      if (variables.mode === 'prepared')
        expectTypeOf(variables).toMatchTypeOf<{
          mode: 'prepared'
          chainId?: number | undefined
          request: {
            abi: Abi
            functionName: string
            args?: readonly unknown[] | undefined
          }
        }>()
      else
        expectTypeOf(variables).toMatchTypeOf<{
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
    },
  })

  expectTypeOf(data).toEqualTypeOf<{ hash: Hash } | undefined>()
  expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
  expectTypeOf(variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  write(
    {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
      chainId: 123,
    },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionError>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        if (variables.mode === 'prepared') {
          expectTypeOf(variables).toMatchTypeOf<{
            mode: 'prepared'
            chainId?: number | undefined
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
          }>()
        } else {
          expectTypeOf(variables).toMatchTypeOf<{
            abi: typeof abi.erc20
            functionName: 'approve' | 'transfer' | 'transferFrom'
            args: readonly [Address, Address, bigint]
          }>()
        }

        expectTypeOf(data).toEqualTypeOf<{ hash: Hash }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<{ hash: Hash } | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})

test('usePrepareContractWrite', () => {
  const prepared = usePrepareContractWrite({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 123,
  })
  const { write } = useContractWrite()

  // pass simulate right through to write (https://viem.sh/docs/contract/writeContract.html#usage)
  // remove chain and account
  // chainId narrowing

  if (prepared?.data) write(prepared?.data)
})
