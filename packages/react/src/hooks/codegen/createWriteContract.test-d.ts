import { abi } from '@wagmi/test'
import { type Address, type Hash } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createWriteContract } from './createWriteContract.js'

const contextValue = { foo: 'bar' } as const

test('default', () => {
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
    // ^?
  })

  // @ts-expect-error chain id must match address keys
  writeContract({
    functionName: 'transfer',
    args: ['0x', 123n],
    chainId: 420,
  })

  // @ts-expect-error address not allowed
  writeContract({
    address: '0x',
    functionName: 'transfer',
    args: ['0x', 123n],
  })
})

test('overloads', () => {
  const useWriteErc20 = createWriteContract({
    abi: abi.writeOverloads,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const { writeContract } = useWriteErc20()
  writeContract({
    functionName: 'foo',
    args: [],
  })

  writeContract({
    functionName: 'foo',
    args: ['0x'],
  })

  writeContract({
    functionName: 'foo',
    args: ['0x', '0x'],
  })
})

test.todo('useSimulateContract', () => {})
