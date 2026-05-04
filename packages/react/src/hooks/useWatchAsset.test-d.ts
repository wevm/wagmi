import type { MutationFunctionContext, WatchAssetErrorType } from '@wagmi/core'
import type { WatchAssetVariables } from '@wagmi/core/query'
import { expectTypeOf, test } from 'vitest'

import { useWatchAsset } from './useWatchAsset.js'

const tokenInfo = {
  address: '0x0000000000000000000000000000000000000000',
  symbol: 'NULL',
  decimals: 18,
}
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const watchAsset = useWatchAsset({
    mutation: {
      onMutate(variables, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
        return contextValue
      },
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(error).toEqualTypeOf<WatchAssetErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(data).toEqualTypeOf<boolean>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<boolean | undefined>()
        expectTypeOf(error).toEqualTypeOf<WatchAssetErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  })

  expectTypeOf(watchAsset.data).toEqualTypeOf<boolean | undefined>()
  expectTypeOf(watchAsset.error).toEqualTypeOf<WatchAssetErrorType | null>()
  expectTypeOf(watchAsset.variables).toEqualTypeOf<
    WatchAssetVariables | undefined
  >()
  expectTypeOf(watchAsset.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  watchAsset.mutate(
    { type: 'ERC20', options: tokenInfo },
    {
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(error).toEqualTypeOf<WatchAssetErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(data).toEqualTypeOf<boolean>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<boolean | undefined>()
        expectTypeOf(error).toEqualTypeOf<WatchAssetErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<WatchAssetVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  )
})
