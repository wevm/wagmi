import type { RequestPermissionsErrorType } from '@wagmi/core'
import type { RequestPermissionsVariables } from '@wagmi/core/query'
import { expectTypeOf, test } from 'vitest'

import { useRequestPermissions } from './useRequestPermissions.js'
import type { WalletPermission } from 'viem'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, requestPermissions, variables } =
    useRequestPermissions({
      mutation: {
        onMutate(variables) {
          expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
          return contextValue
        },
        onError(error, variables, context) {
          expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
          expectTypeOf(error).toEqualTypeOf<RequestPermissionsErrorType>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
        onSuccess(data, variables, context) {
          expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
          expectTypeOf(data).toEqualTypeOf<WalletPermission[]>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        },
        onSettled(data, error, variables, context) {
          expectTypeOf(data).toEqualTypeOf<WalletPermission[] | undefined>()
          expectTypeOf(
            error,
          ).toEqualTypeOf<RequestPermissionsErrorType | null>()
          expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
      },
    })

  expectTypeOf(data).toEqualTypeOf<WalletPermission[] | undefined>()
  expectTypeOf(error).toEqualTypeOf<RequestPermissionsErrorType | null>()
  expectTypeOf(variables).toEqualTypeOf<
    RequestPermissionsVariables | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  requestPermissions(
    { eth_accounts: {} },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
        expectTypeOf(error).toEqualTypeOf<RequestPermissionsErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
        expectTypeOf(data).toEqualTypeOf<WalletPermission[]>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<WalletPermission[] | undefined>()
        expectTypeOf(error).toEqualTypeOf<RequestPermissionsErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<RequestPermissionsVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
