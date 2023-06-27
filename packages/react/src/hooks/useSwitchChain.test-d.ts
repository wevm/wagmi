import { type SwitchChainError } from '@wagmi/core'
import { testChains } from '@wagmi/test'
import type { Chain } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useSwitchChain } from './useSwitchChain.js'

const chainId = testChains.anvil.id
const contextValue = { foo: 'bar' } as const

test('required', () => {
  expectTypeOf(useSwitchChain().switchChain)
    .parameter(0)
    .toEqualTypeOf<{ chainId: number }>()

  // @ts-expect-error
  useSwitchChain().switchChain()
})

test('optional', () => {
  expectTypeOf(useSwitchChain({ chainId }).switchChain)
    .parameter(0)
    .toEqualTypeOf<{ chainId?: number | undefined } | undefined>()
})

test('context', () => {
  useSwitchChain({
    chainId,
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
  }).switchChain(undefined, {
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
  })
})
