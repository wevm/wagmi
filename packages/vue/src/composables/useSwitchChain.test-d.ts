import type {
  Connector,
  MutationFunctionContext,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Chain } from '@wagmi/core/chains'
import type { Compute, ExactPartial } from '@wagmi/core/internal'
import { chain } from '@wagmi/test'
import type { AddEthereumChainParameter } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useSwitchChain } from './useSwitchChain.js'

const chainId = chain.mainnet.id
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const switchChain = useSwitchChain({
    mutation: {
      onMutate(variables, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
        return contextValue
      },
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Compute<Chain>>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<Compute<Chain> | undefined>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  })

  expectTypeOf(switchChain.data.value).toEqualTypeOf<
    Compute<Chain> | undefined
  >()
  expectTypeOf(
    switchChain.error.value,
  ).toEqualTypeOf<SwitchChainErrorType | null>()
  expectTypeOf(switchChain.variables.value).toEqualTypeOf<
    | {
        addEthereumChainParameter?:
          | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
          | undefined
        chainId: number
        connector?: Connector | undefined
      }
    | undefined
  >()
  expectTypeOf(switchChain.context.value).toEqualTypeOf<
    typeof contextValue | undefined
  >()

  switchChain.mutate(
    { chainId },
    {
      onError(error, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSuccess(data, variables, context, mutationContext) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Compute<Chain>>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
      onSettled(data, error, variables, context, mutationContext) {
        expectTypeOf(data).toEqualTypeOf<Compute<Chain> | undefined>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        expectTypeOf(mutationContext).toEqualTypeOf<MutationFunctionContext>()
      },
    },
  )
})
