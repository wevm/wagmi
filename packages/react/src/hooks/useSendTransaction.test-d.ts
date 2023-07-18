import { type SendTransactionError } from '@wagmi/core'
import { type Hash, parseEther } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { usePrepareSendTransaction } from './usePrepareSendTransaction.js'
import { useSendTransaction } from './useSendTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, sendTransaction, variables } =
    useSendTransaction({
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
    })

  expectTypeOf(data).toEqualTypeOf<{ hash: Hash } | undefined>()
  expectTypeOf(error).toEqualTypeOf<SendTransactionError | null>()
  expectTypeOf(variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  sendTransaction(
    { to: '0x' },
    {
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
    },
  )
})

test('usePrepareSendTransaction', () => {
  const prepared = usePrepareSendTransaction({
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })
  const { sendTransaction } = useSendTransaction()

  if (prepared?.data) sendTransaction(prepared?.data)
})
