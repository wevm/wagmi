import {
  type Connector,
  type SignMessageError,
  type SignMessageParameters,
} from '@wagmi/core'
import { expectTypeOf, test } from 'vitest'

import { useSignMessage } from './useSignMessage.js'

const message = 'hello world'
const contextValue = { foo: 'bar' } as const

type SignableMessage = SignMessageParameters['message']

test('context', () => {
  const { context, data, error, signMessage, variables } = useSignMessage({
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<{
        connector?: Connector | undefined
        message: SignableMessage
      }>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        connector?: Connector | undefined
        message: SignableMessage
      }>()
      expectTypeOf(error).toEqualTypeOf<SignMessageError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{
        connector?: Connector | undefined
        message: SignableMessage
      }>()
      expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<SignMessageError | null>()
      expectTypeOf(variables).toEqualTypeOf<{
        connector?: Connector | undefined
        message: SignableMessage
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })

  expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
  expectTypeOf(error).toEqualTypeOf<SignMessageError | null>()
  expectTypeOf(variables).toEqualTypeOf<
    | {
        connector?: Connector | undefined
        message: SignableMessage
      }
    | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  signMessage(
    { message },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          connector?: Connector | undefined
          message: SignableMessage
        }>()
        expectTypeOf(error).toEqualTypeOf<SignMessageError>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          connector?: Connector | undefined
          message: SignableMessage
        }>()
        expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignMessageError | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          connector?: Connector | undefined
          message: SignableMessage
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
