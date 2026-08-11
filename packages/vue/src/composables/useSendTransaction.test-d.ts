import { createConfig, http, type SendTransactionErrorType } from '@wagmi/core'
import type { Hash } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { useSendTransaction } from './useSendTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const sendTransaction = useSendTransaction({
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
  })

  expectTypeOf(sendTransaction.data.value).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(
    sendTransaction.error.value,
  ).toEqualTypeOf<SendTransactionErrorType | null>()
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
