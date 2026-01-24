import type { Connector, SwitchAccountErrorType } from '@wagmi/core'
import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useSwitchConnection } from './useSwitchConnection.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, switchConnection, variables } =
    useSwitchConnection({
      mutation: {
        onMutate(variables) {
          expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
          return contextValue
        },
        onError(error, variables, context) {
          expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
          expectTypeOf(error).toEqualTypeOf<SwitchAccountErrorType>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
        onSuccess(data, variables, context) {
          expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
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
          expectTypeOf(error).toEqualTypeOf<SwitchAccountErrorType | null>()
          expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
      },
    })

  expectTypeOf(data.value).toEqualTypeOf<
    | {
        accounts: readonly [Address, ...Address[]]
        chainId: number
      }
    | undefined
  >()
  expectTypeOf(error.value).toEqualTypeOf<SwitchAccountErrorType | null>()
  expectTypeOf(variables.value).toEqualTypeOf<
    { connector: Connector } | undefined
  >()
  expectTypeOf(context.value).toEqualTypeOf<typeof contextValue | undefined>()

  switchConnection(
    { connector },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
        expectTypeOf(error).toEqualTypeOf<SwitchAccountErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
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
        expectTypeOf(error).toEqualTypeOf<SwitchAccountErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
