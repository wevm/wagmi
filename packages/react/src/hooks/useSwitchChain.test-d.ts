import { type SwitchChainError } from '@wagmi/core'
import { chain } from '@wagmi/test'
import type { Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSwitchChain } from './useSwitchChain.js'

const chainId = chain.mainnet.id
const contextValue = { foo: 'bar' } as const

test('context', () => {
  const { context, data, error, switchChain, variables } = useSwitchChain({
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
      expectTypeOf(error).toEqualTypeOf<SwitchChainError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
      expectTypeOf(data).toEqualTypeOf<Chain>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Chain | undefined>()
      expectTypeOf(error).toEqualTypeOf<SwitchChainError | null>()
      expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })

  expectTypeOf(data).toEqualTypeOf<Chain | undefined>()
  expectTypeOf(error).toEqualTypeOf<SwitchChainError | null>()
  expectTypeOf(variables).toEqualTypeOf<{ chainId: number } | undefined>()
  expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()

  switchChain(
    { chainId },
    {
      onError(error, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainError>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
        expectTypeOf(data).toEqualTypeOf<Chain>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Chain | undefined>()
        expectTypeOf(error).toEqualTypeOf<SwitchChainError | null>()
        expectTypeOf(variables).toEqualTypeOf<{ chainId: number }>()
        expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
      },
    },
  )
})
