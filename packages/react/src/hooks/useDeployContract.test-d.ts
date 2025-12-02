import type { DeployContractErrorType } from '@wagmi/core'
import { abi, bytecode } from '@wagmi/test'
import type { Abi, Hash } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useDeployContract } from './useDeployContract.js'

const contextValue = { foo: 'bar' } as const

test('context', () => {
  const deployContract = useDeployContract({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: Abi
          args?: readonly unknown[] | undefined
        }>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<DeployContractErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: Abi
          args?: readonly unknown[] | undefined
        }>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: Abi
          args?: readonly unknown[] | undefined
        }>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<DeployContractErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: Abi
          args?: readonly unknown[] | undefined
        }>()
      },
    },
  })

  expectTypeOf(deployContract.data).toEqualTypeOf<Hash | undefined>()
  expectTypeOf(
    deployContract.error,
  ).toEqualTypeOf<DeployContractErrorType | null>()
  expectTypeOf(deployContract.variables).toMatchTypeOf<
    { chainId?: number | undefined } | undefined
  >()
  expectTypeOf(deployContract.context).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  deployContract.mutate(
    {
      abi: abi.bayc,
      bytecode: bytecode.bayc,
      args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
      chainId: 1,
    },
    {
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<DeployContractErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: typeof abi.bayc
          args: readonly [string, string, bigint, bigint]
        }>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: typeof abi.bayc
          args: readonly [string, string, bigint, bigint]
        }>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Hash | undefined>()
        expectTypeOf(error).toEqualTypeOf<DeployContractErrorType | null>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

        expectTypeOf(variables).toMatchTypeOf<{
          chainId?: number | undefined
          abi: typeof abi.bayc
          args: readonly [string, string, bigint, bigint]
        }>()
      },
    },
  )
})
