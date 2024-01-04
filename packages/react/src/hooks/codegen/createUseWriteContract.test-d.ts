import { abi } from '@wagmi/test'
import { type Address, type Hash } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { useSimulateContract } from '../useSimulateContract.js'
import { createUseWriteContract } from './createUseWriteContract.js'

const contextValue = { foo: 'bar' } as const

test('default', () => {
  const useWriteErc20 = createUseWriteContract({
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
  const useWriteErc20 = createUseWriteContract({
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
  const useWriteErc20 = createUseWriteContract({
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

  writeContract({
    functionName: 'transfer',
    args: ['0x', 123n],
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  writeContract({
    // @ts-expect-error address not allowed
    address: '0x',
    functionName: 'transfer',
    args: ['0x', 123n],
  })
})

test('overloads', () => {
  const useWriteOverloads = createUseWriteContract({
    abi: abi.writeOverloads,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const { writeContract } = useWriteOverloads()
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

test('useSimulateContract', () => {
  const useWriteErc20 = createUseWriteContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const { data } = useSimulateContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })
  const { writeContract } = useWriteErc20()

  const request = data?.request
  if (request) writeContract(request)
})

test('functionName', () => {
  const useWriteErc20 = createUseWriteContract({
    abi: abi.erc20,
    functionName: 'transfer',
  })

  const { writeContract } = useWriteErc20()
  writeContract({
    address: '0x',
    args: ['0x', 123n],
  })
})
