import type {
  ConnectErrorType,
  Connector,
  CreateConnectorFn,
} from '@wagmi/core'
import { config } from '@wagmi/test'
import type { Address, Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useConnect } from './useConnect.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const connect = useConnect({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
          withCapabilities?: boolean | undefined
        }>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
          withCapabilities?: boolean | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
          withCapabilities?: boolean | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<{
          accounts:
            | readonly [Address, ...Address[]]
            | readonly [
                { address: Address; capabilities: Record<string, unknown> },
                ...{
                  address: Address
                  capabilities: Record<string, unknown>
                }[],
              ]
          chainId: number
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts:
                | readonly [Address, ...Address[]]
                | readonly [
                    {
                      address: Address
                      capabilities: Record<string, unknown>
                    },
                    ...{
                      address: Address
                      capabilities: Record<string, unknown>
                    }[],
                  ]
              chainId: number
            }
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: Connector | CreateConnectorFn
          withCapabilities?: boolean | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(connect.data).toEqualTypeOf<
    | {
        accounts:
          | readonly [Address, ...Address[]]
          | readonly [
              { address: Address; capabilities: Record<string, unknown> },
              ...{ address: Address; capabilities: Record<string, unknown> }[],
            ]
        chainId: number
      }
    | undefined
  >()
  expectTypeOf(connect.error).toEqualTypeOf<ConnectErrorType | null>()
  expectTypeOf(connect.variables).toMatchTypeOf<
    | {
        chainId?: number | undefined
        connector: CreateConnectorFn | Connector
      }
    | undefined
  >()
  expectTypeOf(connect.context).toEqualTypeOf<typeof contextValue | undefined>()

  connect.mutate(
    {
      connector,
      foo: 'bar',
    },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: typeof connector | CreateConnectorFn
          foo?: string | undefined
          withCapabilities?: boolean | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: typeof connector | CreateConnectorFn
          foo?: string | undefined
          withCapabilities?: boolean | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<{
          accounts: readonly [Address, ...Address[]]
          chainId: number
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts: readonly [Address, ...Address[]]
              chainId: number
            }
          | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<ConnectErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          chainId?: number | undefined
          connector: typeof connector | CreateConnectorFn
          foo?: string | undefined
          withCapabilities?: boolean | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )

  connect.mutate(
    {
      connector,
      foo: 'bar',
      withCapabilities: true,
    },
    {
      onSuccess(data, _variables, _context) {
        expectTypeOf(data).toEqualTypeOf<{
          accounts: readonly [
            {
              address: Address
              capabilities: {
                foo: { bar: Hex }
              }
            },
            ...{
              address: Address
              capabilities: {
                foo: { bar: Hex }
              }
            }[],
          ]
          chainId: number
        }>()
      },
      onSettled(data, _error, _variables, _context) {
        expectTypeOf(data).toEqualTypeOf<
          | {
              accounts: readonly [
                {
                  address: Address
                  capabilities: {
                    foo: { bar: Hex }
                  }
                },
                ...{
                  address: Address
                  capabilities: {
                    foo: { bar: Hex }
                  }
                }[],
              ]
              chainId: number
            }
          | undefined
        >()
      },
    },
  )

  ;(async () => {
    const res = await connect.mutateAsync({
      connector,
      foo: 'bar',
      withCapabilities: true,
    })
    expectTypeOf(res).toEqualTypeOf<{
      accounts: readonly [
        {
          address: Address
          capabilities: {
            foo: { bar: Hex }
          }
        },
        ...{
          address: Address
          capabilities: {
            foo: { bar: Hex }
          }
        }[],
      ]
      chainId: number
    }>()
  })()
})
