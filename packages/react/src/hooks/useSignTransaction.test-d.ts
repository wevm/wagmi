import type { SignTransactionErrorType } from '@wagmi/core'
import type {
  Hash,
  TransactionSerializedEIP1559,
  TransactionSerializedEIP2930,
  TransactionSerializedEIP4844,
  TransactionSerializedEIP7702,
  TransactionSerializedLegacy,
} from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useSignTransaction } from './useSignTransaction.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const signTransaction = useSignTransaction({
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

  expectTypeOf(signTransaction.data).toMatchTypeOf<Hash | undefined>()
  expectTypeOf(
    signTransaction.error,
  ).toEqualTypeOf<SignTransactionErrorType | null>()
  expectTypeOf(signTransaction.variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(signTransaction.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  signTransaction.mutate(
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

test('legacy', () => {
  const { mutateAsync } = useSignTransaction()

  const result1 = mutateAsync({ gasPrice: 0n })
  const result2 = mutateAsync({ type: 'legacy' })

  expectTypeOf(result1).toEqualTypeOf<Promise<TransactionSerializedLegacy>>()
  expectTypeOf(result2).toEqualTypeOf<Promise<TransactionSerializedLegacy>>()

  // @ts-expect-error
  mutateAsync({
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })

  // @ts-expect-error
  mutateAsync({
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'legacy',
  })
  // @ts-expect-error
  mutateAsync({
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'legacy',
  })
})

test('eip7702', () => {
  const { mutateAsync } = useSignTransaction()

  const result1 = mutateAsync({
    authorizationList: [],
  })
  const result2 = mutateAsync({
    authorizationList: [],
    type: 'eip7702',
  })

  expectTypeOf(result1).toEqualTypeOf<Promise<TransactionSerializedEIP7702>>()
  expectTypeOf(result2).toEqualTypeOf<Promise<TransactionSerializedEIP7702>>()
})

test('eip4844', () => {
  const { mutateAsync } = useSignTransaction()

  const result1 = mutateAsync({
    blobVersionedHashes: [],
    maxFeePerBlobGas: 0n,
    to: '0x0000000000000000000000000000000000000000',
  })
  const result2 = mutateAsync({
    blobVersionedHashes: [],
    maxFeePerBlobGas: 0n,
    to: '0x0000000000000000000000000000000000000000',
    type: 'eip4844',
  })

  expectTypeOf(result1).toEqualTypeOf<Promise<TransactionSerializedEIP4844>>()
  expectTypeOf(result2).toEqualTypeOf<Promise<TransactionSerializedEIP4844>>()
})

test('eip1559', () => {
  const { mutateAsync } = useSignTransaction()

  const result1 = mutateAsync({
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })
  const result2 = mutateAsync({
    type: 'eip1559',
  })

  expectTypeOf(result1).toEqualTypeOf<Promise<TransactionSerializedEIP1559>>()
  expectTypeOf(result2).toEqualTypeOf<Promise<TransactionSerializedEIP1559>>()

  // @ts-expect-error
  mutateAsync({
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })

  // @ts-expect-error
  mutateAsync({
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'eip1559',
  })
  // @ts-expect-error
  mutateAsync({
    gasPrice: 0n,
    type: 'eip1559',
  })
})

test('eip2930', () => {
  const { mutateAsync } = useSignTransaction()

  const result1 = mutateAsync({
    accessList: [],
    gasPrice: 0n,
  })
  const result2 = mutateAsync({
    type: 'eip2930',
  })

  expectTypeOf(result1).toEqualTypeOf<Promise<TransactionSerializedEIP2930>>()
  expectTypeOf(result2).toEqualTypeOf<Promise<TransactionSerializedEIP2930>>()

  // @ts-expect-error
  mutateAsync({
    accessList: [],
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
  })

  // @ts-expect-error
  mutateAsync({
    accessList: [],
    gasPrice: 0n,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'eip2930',
  })
  // @ts-expect-error
  mutateAsync({
    accessList: [],
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    type: 'eip2930',
  })
})
