import { type Connector, type SwitchAccountError } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useSwitchAccount } from './useSwitchAccount.js'
import type { Address } from 'viem'

const connector = config.connectors[0]!
const contextValue = { foo: 'bar' } as const

test('required', () => {
  expectTypeOf(useSwitchAccount().switchAccount)
    .parameter(0)
    .toEqualTypeOf<{ connector: Connector }>()

  // @ts-expect-error
  useSwitchAccount().switchAccount()
})

test('optional', () => {
  expectTypeOf(useSwitchAccount({ connector }).switchAccount)
    .parameter(0)
    .toEqualTypeOf<{ connector?: Connector | undefined } | undefined>()
})

test('context', () => {
  useSwitchAccount({
    connector,
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      expectTypeOf(error).toEqualTypeOf<SwitchAccountError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      expectTypeOf(data).toEqualTypeOf<{
        accounts: readonly Address[]
        chainId: number
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        | {
            accounts: readonly Address[]
            chainId: number
          }
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<SwitchAccountError | null>()
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  }).switchAccount(undefined, {
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      expectTypeOf(error).toEqualTypeOf<SwitchAccountError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      expectTypeOf(data).toEqualTypeOf<{
        accounts: readonly Address[]
        chainId: number
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        | {
            accounts: readonly Address[]
            chainId: number
          }
        | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<SwitchAccountError | null>()
      expectTypeOf(variables).toEqualTypeOf<{ connector: Connector }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })
})
