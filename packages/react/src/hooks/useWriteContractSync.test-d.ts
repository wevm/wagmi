import type { WriteContractSyncErrorType } from '@wagmi/core'
import { abi } from '@wagmi/test'
import type { Abi, TransactionReceipt } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useWriteContractSync } from './useWriteContractSync.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const writeContractSync = useWriteContractSync({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: Abi
          functionName: string
          args?: readonly unknown[] | undefined
        }>()
        return contextValue
      },
      onError(error, _variables, context) {
        expectTypeOf(error).toEqualTypeOf<WriteContractSyncErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, _variables, context) {
        expectTypeOf(data).toEqualTypeOf<TransactionReceipt>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, _variables, context) {
        expectTypeOf(data).toEqualTypeOf<TransactionReceipt | undefined>()
        expectTypeOf(error).toEqualTypeOf<WriteContractSyncErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(writeContractSync.data).toEqualTypeOf<
    TransactionReceipt | undefined
  >()
  expectTypeOf(
    writeContractSync.error,
  ).toEqualTypeOf<WriteContractSyncErrorType | null>()
  expectTypeOf(writeContractSync.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  writeContractSync.mutate({
    address: '0x',
    abi: abi.wagmiMintExample,
    functionName: 'mint',
    chainId: 1,
  })
})
