import type { SignTransactionErrorType } from '@wagmi/core'
import type { Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSignTransaction } from './useSignTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const sendTransaction = useSignTransaction({
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
        expectTypeOf(data).toMatchTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toMatchTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(sendTransaction.data.value).toMatchTypeOf<Hash | undefined>()
  expectTypeOf(
    sendTransaction.error.value,
  ).toEqualTypeOf<SignTransactionErrorType | null>()
  expectTypeOf(sendTransaction.variables.value).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(sendTransaction.context.value).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  sendTransaction.mutate(
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
        expectTypeOf(data).toMatchTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toMatchTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<SignTransactionErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
