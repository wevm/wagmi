import type { SignTransactionErrorType } from '@wagmi/core'
import type { TransactionSerialized } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSignTransaction } from './useSignTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, signTransaction, variables } =
    useSignTransaction({
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
          expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
        onSuccess(data, variables, context) {
          expectTypeOf(variables).toMatchTypeOf<{
            chainId?: number | undefined
          }>()
          expectTypeOf(data).toEqualTypeOf<TransactionSerialized>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        },
        onSettled(data, error, variables, context) {
          expectTypeOf(data).toEqualTypeOf<TransactionSerialized | undefined>()
          expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType | null>()
          expectTypeOf(variables).toMatchTypeOf<{
            chainId?: number | undefined
          }>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
      },
    })

  expectTypeOf(data).toEqualTypeOf<TransactionSerialized | undefined>()
  expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType | null>()
  expectTypeOf(variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  signTransaction(
    { to: '0x' },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<TransactionSerialized>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<TransactionSerialized | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
