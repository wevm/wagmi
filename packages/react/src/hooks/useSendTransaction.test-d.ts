import { type SendTransactionErrorType } from '@wagmi/core'
import { type Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSendTransaction } from './useSendTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, sendTransaction, variables } =
    useSendTransaction({
      mutation: {
        onMutate(variables) {
          expectTypeOf(variables).toMatchTypeOf<
            { chainId?: number | undefined } | undefined
          >()
          return contextValue
        },
        onError(error, variables, context) {
          expectTypeOf(variables).toMatchTypeOf<{
            chainId?: number | undefined
          }>()
          expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
        onSuccess(data, variables, context) {
          expectTypeOf(variables).toMatchTypeOf<{
            chainId?: number | undefined
          }>()
          expectTypeOf(data).toEqualTypeOf<Hash>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
        onSettled(data, error, variables, context) {
          expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
          expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType | null>()
          expectTypeOf(variables).toMatchTypeOf<{
            chainId?: number | undefined
          }>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
      },
    })

  expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType | null>()
  expectTypeOf(variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  sendTransaction(
    { to: '0x' },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
