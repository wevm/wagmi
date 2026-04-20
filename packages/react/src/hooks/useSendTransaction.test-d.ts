import {
  createConfig,
  http,
  type MutationFunctionContext,
  type SendTransactionErrorType,
} from '@wagmi/core'
import type { Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, tempoLocalnet } from 'viem/chains'
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

  expectTypeOf(sendTransaction.data).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(
    sendTransaction.error,
  ).toEqualTypeOf<SendTransactionErrorType | null>()
  expectTypeOf(sendTransaction.variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(sendTransaction.context).toEqualTypeOf<
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

test('tempo feePayer', () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )
  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  const sendTransaction = useSendTransaction({ config })

  sendTransaction.mutate({
    chainId: tempoLocalnet.id,
    to: '0x',
    value: 1n,
    feePayer: true,
  })

  sendTransaction.mutate({
    chainId: tempoLocalnet.id,
    to: '0x',
    value: 1n,
    feePayer,
  })

  sendTransaction.mutate({
    chainId: mainnet.id,
    to: '0x',
    value: 1n,
    // @ts-expect-error
    feePayer: true,
  })
})
