import { type SendTransactionError } from '@wagmi/core'
import { testChains } from '@wagmi/test'
import type { Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSendTransaction } from './useSendTransaction.js'

const chainId = testChains.anvil.id
const contextValue = { foo: 'bar' } as const

test('optional', () => {
  expectTypeOf(useSendTransaction({ chainId }).sendTransaction)
    .parameter(0)
    .toMatchTypeOf<{ chainId?: number | undefined } | undefined>()
})

test('context', () => {
  useSendTransaction({
    chainId,
    onMutate(variables) {
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<SendTransactionError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      expectTypeOf(data).toEqualTypeOf<{ hash: Hash }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<{ hash: Hash } | undefined>()
      expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  }).sendTransaction(undefined, {
    onError(error, variables, context) {
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<SendTransactionError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      expectTypeOf(data).toEqualTypeOf<{ hash: Hash }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<{ hash: Hash } | undefined>()
      expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
      expectTypeOf(variables).toMatchTypeOf<
        { chainId?: number | undefined } | undefined
      >()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })
})
