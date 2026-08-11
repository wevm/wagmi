'use client'

import {
  createConfig,
  http,
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
        expectTypeOf(error).toEqualTypeOf<SendTransactionSyncErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<TransactionReceipt>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<TransactionReceipt | undefined>()
        expectTypeOf(error).toEqualTypeOf<SendTransactionSyncErrorType | null>()
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
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
