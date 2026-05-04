import type { MutationFunctionContext, SignMessageErrorType } from '@wagmi/core'
import type { SignMessageVariables } from '@wagmi/core/query'
import { expectTypeOf, test } from 'vitest'

import { useSignMessage } from './useSignMessage.js'

const message = 'hello world'
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const signMessage = useSignMessage({
    mutation: {
      onMutate(variables, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
        return contextValue
      },
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  })

  expectTypeOf(signMessage.data).toEqualTypeOf<`0x${string}` | undefined>()
  expectTypeOf(signMessage.error).toEqualTypeOf<SignMessageErrorType | null>()
  expectTypeOf(signMessage.variables).toEqualTypeOf<
    SignMessageVariables | undefined
  >()
  expectTypeOf(signMessage.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  signMessage.mutate(
    { message },
    {
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  )
})
