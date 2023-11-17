import { abi } from '@wagmi/test'
import { type Address, type Hash } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createWriteContract } from './createWriteContract.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const useWriteErc20 = createWriteContract({
    abi: abi.erc20,
  })

  const { writeContract } = useWriteErc20()
  writeContract({
    address: '0x',
    functionName: 'transfer',
    args: ['0x', 123n],
  })
})

test('context', () => {
  const useWriteErc20 = createWriteContract({
    abi: abi.erc20,
  })

  const { writeContract } = useWriteErc20({
    mutation: {
      onMutate() {
        return contextValue
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(variables.functionName).toEqualTypeOf<string>()
        expectTypeOf(variables.args).toEqualTypeOf<
          readonly unknown[] | undefined
        >()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  writeContract(
    {
      address: '0x',
      functionName: 'transfer',
      args: ['0x', 123n],
    },
    {
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(variables.functionName).toEqualTypeOf<'transfer'>()
        expectTypeOf(variables.args).toEqualTypeOf<readonly [Address, bigint]>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
    },
  )
})

test('multichain address', () => {
  const useWriteErc20 = createWriteContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const { writeContract } = useWriteErc20()
  writeContract({
    functionName: 'transfer',
    args: ['0x', 123n],
    chainId: mainnet.id,
  })
})

test.todo('useSimulateContract', () => {})
