'use client'

import {
  createConfig,
  http,
  type MutationFunctionContext,
  type SendTransactionSyncErrorType,
} from '@wagmi/core'
import type { TransactionReceipt } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { useSendTransactionSync } from './useSendTransactionSync.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const sendTransactionSync = useSendTransactionSync({
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
        expectTypeOf(error).toEqualTypeOf<SendTransactionSyncErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<TransactionReceipt>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<TransactionReceipt | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionSyncErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  })

  expectTypeOf(sendTransactionSync.data).toEqualTypeOf<
    TransactionReceipt | undefined
  >()
  expectTypeOf(
    sendTransactionSync.error,
  ).toEqualTypeOf<SendTransactionSyncErrorType | null>()

  sendTransactionSync.mutate({ to: '0x' })
})

test('tempo feePayer', () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )
  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  const sendTransactionSync = useSendTransactionSync({ config })

  sendTransactionSync.mutate({
    chainId: tempoLocalnet.id,
    to: '0x',
    value: 1n,
    feePayer: true,
  })

  sendTransactionSync.mutate({
    chainId: tempoLocalnet.id,
    to: '0x',
    value: 1n,
    feePayer,
  })

  sendTransactionSync.mutate({
    chainId: mainnet.id,
    to: '0x',
    value: 1n,
    // @ts-expect-error
    feePayer: true,
  })
})
