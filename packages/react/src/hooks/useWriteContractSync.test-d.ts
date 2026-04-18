import {
  createConfig,
  http,
  type WriteContractSyncErrorType,
} from '@wagmi/core'
import { abi } from '@wagmi/test'
import type { Abi, TransactionReceipt } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, tempoLocalnet } from 'viem/chains'
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

test('tempo feePayer', () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )
  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  const writeContractSync = useWriteContractSync({ config })

  writeContractSync.mutate({
    chainId: tempoLocalnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feePayer: true,
  })

  writeContractSync.mutate({
    chainId: tempoLocalnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feePayer,
  })

  writeContractSync.mutate({
    chainId: mainnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error
    feePayer: true,
  })
})
