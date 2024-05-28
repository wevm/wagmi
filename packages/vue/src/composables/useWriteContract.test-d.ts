import type { WriteContractErrorType } from '@wagmi/core'
import { abi } from '@wagmi/test'
import type { Abi, Address, Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSimulateContract } from './useSimulateContract.js'
import { useWriteContract } from './useWriteContract.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const {
    context,
    data,
    error,
    writeContract: write,
    variables,
  } = useWriteContract({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
    },
  })

  expectTypeOf(data.value).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(error.value).toEqualTypeOf<WriteContractErrorType | null>()
  expectTypeOf(variables.value).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context.value).toEqualTypeOf<typeof contextValue | undefined>()

  write(
    {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
      chainId: 1,
    },
    {
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: typeof abi.erc20
          functionName: 'transferFrom'
          args: readonly [Address, Address, bigint]
        }>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables.functionName).toEqualTypeOf<'transferFrom'>()
        expectTypeOf(variables.args).toEqualTypeOf<
          readonly [Address, Address, bigint]
        >()
        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: typeof abi.erc20
          functionName: 'transferFrom'
          args: readonly [Address, Address, bigint]
        }>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          __mode?: 'prepared'
          chainId?: number | undefined
          abi: typeof abi.erc20
          functionName: 'transferFrom'
          args: readonly [Address, Address, bigint]
        }>()
      },
    },
  )
})

test('useSimulateContract', () => {
  const { data } = useSimulateContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })
  const { writeContract } = useWriteContract()

  const request = data?.value?.request
  if (request) writeContract(request)
})
