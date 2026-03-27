import type { WriteContractErrorType } from '@wagmi/core'
import { abi } from '@wagmi/test'
import type { Abi, Address, Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useWriteContract } from './useWriteContract.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const writeContract = useWriteContract(() => ({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<{
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
  expectTypeOf(writeContract.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()
})
