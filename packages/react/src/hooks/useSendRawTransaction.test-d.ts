import type { SendRawTransactionErrorType } from '@wagmi/core'
import type { Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSendRawTransaction } from './useSendRawTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, sendRawTransaction, variables } =
    useSendRawTransaction({
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
          expectTypeOf(error).toEqualTypeOf<SendRawTransactionErrorType>()
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
          expectTypeOf(
            error,
          ).toEqualTypeOf<SendRawTransactionErrorType | null>()
          expectTypeOf(variables).toMatchTypeOf<{
            chainId?: number | undefined
          }>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
      },
    })

  expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(error).toEqualTypeOf<SendRawTransactionErrorType | null>()
  expectTypeOf(variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  sendRawTransaction(
    { serializedTransaction: '0x' },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SendRawTransactionErrorType>()
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
        expectTypeOf(error).toEqualTypeOf<SendRawTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
