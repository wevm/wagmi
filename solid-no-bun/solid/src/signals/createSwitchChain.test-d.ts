import { type Connector, type SwitchChainErrorType } from '@wagmi/core'
import { type Chain } from '@wagmi/core/chains'
import { type Evaluate } from '@wagmi/core/internal'
import { chain } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useSwitchChain } from './useSwitchChain.js'

const chainId = chain.mainnet.id
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, switchChain, variables } = useSwitchChain({
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Evaluate<Chain>>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Evaluate<Chain> | undefined>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  })

  expectTypeOf(data).toEqualTypeOf<Evaluate<Chain> | undefined>()
  expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType | null>()
  expectTypeOf(variables).toEqualTypeOf<
    { chainId: number; connector?: Connector | undefined } | undefined
  >()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  switchChain(
    { chainId },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(data).toEqualTypeOf<Evaluate<Chain>>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Evaluate<Chain> | undefined>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<{
          chainId: number
          connector?: Connector | undefined
        }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
