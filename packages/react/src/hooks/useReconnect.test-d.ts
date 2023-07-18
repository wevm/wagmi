import {
  type Connector,
  type CreateConnectorFn,
  type ReconnectError,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useReconnect } from './useReconnect.js'
import type { Address } from 'viem'

const connectors = [config.connectors[0]!]
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, reconnect, variables } = useReconnect({
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
          }
        | undefined
      >()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
          }
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<ReconnectError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
          }
        | undefined
      >()
      expectTypeOf(data).toEqualTypeOf<
        {
          accounts: readonly Address[]
          chainId: number
          connector: Connector
        }[]
      >()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        | {
            accounts: readonly Address[]
            chainId: number
            connector: Connector
          }[]
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<ReconnectError | null>()
      expectTypeOf(variables).toEqualTypeOf<
        | {
            connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
          }
        | undefined
      >()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })

  expectTypeOf(data).toEqualTypeOf<
    | {
        accounts: readonly Address[]
        chainId: number
        connector: Connector
      }[]
    | undefined
  >()
  expectTypeOf(error).toEqualTypeOf<ReconnectError | null>()
  expectTypeOf(variables).toEqualTypeOf<
    | {
        connectors?: readonly (CreateConnectorFn | Connector)[] | undefined
      }
    | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

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
        expectTypeOf(error).toEqualTypeOf<ReconnectError>()
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
          | {
              accounts: readonly Address[]
              chainId: number
              connector: Connector
            }[]
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts: readonly Address[]
              chainId: number
              connector: Connector
            }[]
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ReconnectError | null>()
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
