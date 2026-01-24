import type { Connector, SwitchAccountErrorType } from '@wagmi/core'
import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useSwitchConnection } from './useSwitchConnection.js'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const switchConnection = useSwitchConnection({
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

  expectTypeOf(switchConnection.data).toEqualTypeOf<
    | {
        accounts: readonly [Address, ...Address[]]
        chainId: number
      }
    | undefined
  >()
  expectTypeOf(
    switchConnection.error,
  ).toEqualTypeOf<SwitchAccountErrorType | null>()
  expectTypeOf(switchConnection.variables).toEqualTypeOf<
    { connector: Connector } | undefined
  >()
  expectTypeOf(switchConnection.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  switchConnection.mutate(
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
