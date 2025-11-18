import type { SignMessageErrorType } from '@wagmi/core'
import type { SignMessageVariables } from '@wagmi/core/query'
import { expectTypeOf, test } from 'vitest'

import { useSignMessage } from './useSignMessage.js'

const message = 'hello world'
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const signMessage = useSignMessage({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(signMessage.data.value).toEqualTypeOf<
    `0x${string}` | undefined
  >()
  expectTypeOf(
    signMessage.error.value,
  ).toEqualTypeOf<SignMessageErrorType | null>()
  expectTypeOf(signMessage.variables.value).toEqualTypeOf<
    SignMessageVariables | undefined
  >()
  expectTypeOf(signMessage.context.value).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  signMessage.mutate(
    { message },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignMessageErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<SignMessageVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
