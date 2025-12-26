import type { WriteContractErrorType } from '@wagmi/core'
import { abi } from '@wagmi/test'
import type { Abi, Address, Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useWriteContract } from './useWriteContract.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  type RawVariables = {
    chainId?: number | undefined
    abi: Abi
    functionName: string
    args?: readonly unknown[] | undefined
  }

  const writeContract = useWriteContract(() => ({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<RawVariables>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<RawVariables>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables).toMatchTypeOf<RawVariables>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
      },
    },
  }))

  expectTypeOf(writeContract.data).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(
    writeContract.error,
  ).toEqualTypeOf<WriteContractErrorType | null>()
  expectTypeOf(writeContract.variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(writeContract.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  type Variables = {
    chainId?: number | undefined
    abi: typeof abi.erc20
    functionName: 'transferFrom'
    args: readonly [Address, Address, bigint]
  }

  writeContract.mutate(
    {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n] as const,
      chainId: 1,
    },
    {
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<Variables>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables.functionName).toEqualTypeOf<'transferFrom'>()
        expectTypeOf(variables.args).toEqualTypeOf<
          readonly [Address, Address, bigint]
        >()
        expectTypeOf(variables).toMatchTypeOf<Variables>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<WriteContractErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<Variables>()
      },
    },
  )
})
