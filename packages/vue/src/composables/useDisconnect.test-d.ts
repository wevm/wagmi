import type { Connector, DisconnectErrorType } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('parameter', () => {
  expectTypeOf(useDisconnect().disconnect)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
  expectTypeOf(useDisconnect().disconnect)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
})

test('context', () => {
  const { context, data, disconnect, error, variables } = useDisconnect({
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

  expectTypeOf(data.value).toEqualTypeOf<void | undefined>()
  expectTypeOf(error.value).toEqualTypeOf<DisconnectErrorType | null>()
  expectTypeOf(variables.value).toEqualTypeOf<
    { connector?: Connector | undefined } | undefined
  >()
  expectTypeOf(context.value).toEqualTypeOf<typeof contextValue | undefined>()

  disconnect(
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
