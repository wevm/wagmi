import type { Connector, SwitchChainErrorType } from '@wagmi/core'
import type { Chain } from '@wagmi/core/chains'
import type { Compute, ExactPartial } from '@wagmi/core/internal'
import { chain } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import type { AddEthereumChainParameter } from 'viem'
import { useSwitchChain } from './useSwitchChain.js'

const chainId = chain.mainnet.id
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { chains, context, data, error, switchChain, variables } =
    useSwitchChain({
      mutation: {
        onMutate(variables) {
          expectTypeOf(variables).toEqualTypeOf<{
            addEthereumChainParameter?:
              | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
              | undefined
            chainId: number
            connector?: Connector | undefined
          }>()
          return contextValue
        },
        onError(error, variables, context) {
          expectTypeOf(variables).toEqualTypeOf<{
            addEthereumChainParameter?:
              | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
              | undefined
            chainId: number
            connector?: Connector | undefined
          }>()
          expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
        },
        onSuccess(data, variables, context) {
          expectTypeOf(variables).toEqualTypeOf<{
            addEthereumChainParameter?:
              | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
              | undefined
            chainId: number
            connector?: Connector | undefined
          }>()
          expectTypeOf(data).toEqualTypeOf<Compute<Chain>>()
          expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
        },
        onSettled(data, error, variables, context) {
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
        },
      },
    })

  expectTypeOf(chains).toEqualTypeOf<readonly [Chain, ...Chain[]]>()
  expectTypeOf(data).toEqualTypeOf<Compute<Chain> | undefined>()
  expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType | null>()
  expectTypeOf(variables).toEqualTypeOf<
    | {
        addEthereumChainParameter?:
          | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
          | undefined
        chainId: number
        connector?: Connector | undefined
      }
    | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  switchChain(
    { chainId },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          addEthereumChainParameter?:
            | ExactPartial<Omit<AddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Compute<Chain>>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
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
      },
    },
  )
})
