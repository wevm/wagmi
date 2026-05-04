import type {
  Connector,
  DisconnectErrorType,
  MutationFunctionContext,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('parameter', () => {
  expectTypeOf(useDisconnect().mutate)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
  expectTypeOf(useDisconnect().mutate)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
})

test('context', () => {
  const disconnect = useDisconnect(() => ({
    mutation: {
      onMutate(variables, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
        return contextValue
      },
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(data).toEqualTypeOf<void>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<void | undefined>()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  }))

  expectTypeOf(disconnect.data).toEqualTypeOf<void | undefined>()
  expectTypeOf(disconnect.error).toEqualTypeOf<DisconnectErrorType | null>()
  expectTypeOf(disconnect.variables).toEqualTypeOf<
    { connector?: Connector | undefined } | undefined
  >()
  expectTypeOf(disconnect.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  disconnect.mutate(
    { connector },
    {
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(data).toEqualTypeOf<void>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<void | undefined>()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  )
})
