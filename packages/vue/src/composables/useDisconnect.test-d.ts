import type { Connector, DisconnectErrorType } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('parameter', () => {
  expectTypeOf(useDisconnect().mutate)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
  expectTypeOf(useDisconnect().mutateAsync)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
})

test('context', () => {
  const disconnect = useDisconnect({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(data).toEqualTypeOf<void>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<void | undefined>()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(disconnect.data.value).toEqualTypeOf<void | undefined>()
  expectTypeOf(
    disconnect.error.value,
  ).toEqualTypeOf<DisconnectErrorType | null>()
  expectTypeOf(disconnect.variables.value).toEqualTypeOf<
    { connector?: Connector | undefined } | undefined
  >()
  expectTypeOf(disconnect.context.value).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  disconnect.mutate(
    { connector },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(data).toEqualTypeOf<void>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<void | undefined>()
        expectTypeOf(error).toEqualTypeOf<DisconnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          { connector?: Connector | undefined } | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
