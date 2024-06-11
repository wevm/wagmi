import type {
  Connector,
  CreateConnectorFn,
  ReconnectErrorType,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import type { Address } from 'viem'
import { useReconnect } from './useReconnect.js'

const connectors = [config.connectors[0]!]
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, reconnect, variables } = useReconnect({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ReconnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        expectTypeOf(data).toEqualTypeOf<
          {
            accounts: readonly [Address, ...Address[]]
            chainId: number
            connector: Connector
          }[]
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts: readonly [Address, ...Address[]]
              chainId: number
              connector: Connector
            }[]
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ReconnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(data.value).toEqualTypeOf<
    | {
        accounts: readonly [Address, ...Address[]]
        chainId: number
        connector: Connector
      }[]
    | undefined
  >()
  expectTypeOf(error.value).toEqualTypeOf<ReconnectErrorType | null>()
  expectTypeOf(variables.value).toEqualTypeOf<
    | {
        connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
      }
    | undefined
  >()
  expectTypeOf(context.value).toEqualTypeOf<typeof contextValue | undefined>()

  reconnect(
    { connectors },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ReconnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        expectTypeOf(data).toEqualTypeOf<
          {
            accounts: readonly [Address, ...Address[]]
            chainId: number
            connector: Connector
          }[]
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts: readonly [Address, ...Address[]]
              chainId: number
              connector: Connector
            }[]
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ReconnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          | {
              connectors?:
                | readonly (CreateConnectorFn | Connector)[]
                | undefined
            }
          | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
