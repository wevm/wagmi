import { type SendTransactionError } from '@wagmi/core'
import { testChains } from '@wagmi/test'
import { type Address, type Hash, parseEther } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { usePrepareSendTransaction } from './usePrepareSendTransaction.js'
import { useSendTransaction } from './useSendTransaction.js'

const chainId = testChains.anvil.id
const contextValue = { foo: 'bar' } as const

test('required', () => {
  expectTypeOf(useSendTransaction().sendTransaction)
    .parameter(0)
    .toMatchTypeOf<{ to: Address }>()

  // @ts-expect-error
  useSendTransaction().sendTransaction()
})

test('optional', () => {
  expectTypeOf(useSendTransaction({ to: '0x' }).sendTransaction)
    .parameter(0)
    .toMatchTypeOf<{ to?: Address | undefined } | undefined>()
})

test('context', () => {
  useSendTransaction({
    chainId,
    to: '0x',
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

test('usePrepareSendTransaction', () => {
  const prepared = usePrepareSendTransaction({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
  const { sendTransaction } = useSendTransaction(prepared?.data)
  sendTransaction()
})
