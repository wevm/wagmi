import type { AddChainErrorType } from '@wagmi/core'
import type { AddChainVariables } from '@wagmi/core/query'
import { avalanche } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import { useAddChain } from './useAddChain.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, addChain, variables } = useAddChain({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        expectTypeOf(error).toEqualTypeOf<AddChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        expectTypeOf(data).toEqualTypeOf<void>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<void | undefined>()
        expectTypeOf(error).toEqualTypeOf<AddChainErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(data).toEqualTypeOf<void | undefined>()
  expectTypeOf(error).toEqualTypeOf<AddChainErrorType | null>()
  expectTypeOf(variables).toEqualTypeOf<AddChainVariables | undefined>()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  addChain(
    { chain: avalanche },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        expectTypeOf(error).toEqualTypeOf<AddChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        expectTypeOf(data).toEqualTypeOf<void>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<void | undefined>()
        expectTypeOf(error).toEqualTypeOf<AddChainErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<AddChainVariables>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
