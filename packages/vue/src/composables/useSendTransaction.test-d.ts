import type {
  MutationFunctionContext,
  SendTransactionErrorType,
} from '@wagmi/core'
import type { Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSendTransaction } from './useSendTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const sendTransaction = useSendTransaction({
    mutation: {
      onMutate(variables, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<
          { chainId?: number | undefined } | undefined
        >()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
        return contextValue
      },
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  })

  expectTypeOf(sendTransaction.data.value).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(
    sendTransaction.error.value,
  ).toEqualTypeOf<SendTransactionErrorType | null>()
  expectTypeOf(sendTransaction.variables.value).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(sendTransaction.context.value).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  sendTransaction.mutate(
    { to: '0x' },
    {
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  )
})
