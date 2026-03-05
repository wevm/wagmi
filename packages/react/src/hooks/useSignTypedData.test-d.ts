import type {
  MutationFunctionContext,
  SignTypedDataErrorType,
  SignTypedDataReturnType,
} from '@wagmi/core'
import type { SignTypedDataVariables } from '@wagmi/core/query'
import { typedData } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useSignTypedData } from './useSignTypedData.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const signTypedData = useSignTypedData({
    mutation: {
      onMutate(variables, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
        return contextValue
      },
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
        expectTypeOf(error).toEqualTypeOf<SignTypedDataErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
        expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignTypedDataErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<SignTypedDataVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  })

  expectTypeOf(signTypedData.data).toEqualTypeOf<
    SignTypedDataReturnType | undefined
  >()
  expectTypeOf(
    signTypedData.error,
  ).toEqualTypeOf<SignTypedDataErrorType | null>()
  expectTypeOf(signTypedData.variables).toMatchTypeOf<
    SignTypedDataVariables | undefined
  >()
  expectTypeOf(signTypedData.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  signTypedData.mutate(
    {
      types: typedData.basic.types,
      primaryType: 'Person',
      message: {
        name: 'Bob',
        wallet: '0x',
      },
    },
    {
      onError(error, variables, context, mutationContext) {
        expectTypeOf(error).toEqualTypeOf<SignTypedDataErrorType>()
        expectTypeOf(variables).toMatchTypeOf<{
          types: typeof typedData.basic.types
          primaryType: 'Person'
          message: {
            name: string
            wallet: `0x${string}`
          }
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType>()
        expectTypeOf(variables).toMatchTypeOf<{
          types: typeof typedData.basic.types
          primaryType: 'Person'
          message: {
            name: string
            wallet: `0x${string}`
          }
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<SignTypedDataReturnType | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignTypedDataErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          types: typeof typedData.basic.types
          primaryType: 'Person'
          message: {
            name: string
            wallet: `0x${string}`
          }
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  )
})
