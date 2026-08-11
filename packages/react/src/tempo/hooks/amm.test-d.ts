import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as amm from './amm.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('usePool', () => {
  const result = amm.usePool({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.amm.getPool.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useLiquidityBalance', () => {
  const result = amm.useLiquidityBalance({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.amm.getLiquidityBalance.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useRebalanceSwap', () => {
  const variables = {} as Actions.amm.rebalanceSwap.Parameters<typeof config>

  const rebalanceSwap = amm.useRebalanceSwap({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwap.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.amm.rebalanceSwap.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.amm.rebalanceSwap.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.amm.rebalanceSwap.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.amm.rebalanceSwap.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(rebalanceSwap.data).toEqualTypeOf<
    Actions.amm.rebalanceSwap.ReturnValue | undefined
  >()
  expectTypeOf(
    rebalanceSwap.error,
  ).toEqualTypeOf<Actions.amm.rebalanceSwap.ErrorType | null>()
  expectTypeOf(rebalanceSwap.variables).toEqualTypeOf<
    Actions.amm.rebalanceSwap.Parameters<typeof config> | undefined
  >()
  expectTypeOf(rebalanceSwap.context).toEqualTypeOf<Context | undefined>()

  rebalanceSwap.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.amm.rebalanceSwap.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.amm.rebalanceSwap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.amm.rebalanceSwap.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.amm.rebalanceSwap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.amm.rebalanceSwap.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.amm.rebalanceSwap.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.amm.rebalanceSwap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.amm.rebalanceSwapSync.Parameters<
    typeof config
  >

  const rebalanceSwapSync = amm.useRebalanceSwapSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwapSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwapSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwapSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.amm.rebalanceSwapSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.amm.rebalanceSwapSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(rebalanceSwapSync.data).toEqualTypeOf<
    Actions.amm.rebalanceSwapSync.ReturnValue | undefined
  >()
  expectTypeOf(
    rebalanceSwapSync.error,
  ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ErrorType | null>()
  expectTypeOf(rebalanceSwapSync.variables).toEqualTypeOf<
    Actions.amm.rebalanceSwapSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(rebalanceSwapSync.context).toEqualTypeOf<Context | undefined>()

  rebalanceSwapSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.amm.rebalanceSwapSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.amm.rebalanceSwapSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.amm.rebalanceSwapSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.amm.rebalanceSwapSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.amm.rebalanceSwapSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useMint', () => {
  const variables = {} as Actions.amm.mint.Parameters<typeof config>

  const mint = amm.useMint({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.amm.mint.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.amm.mint.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.amm.mint.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.amm.mint.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.amm.mint.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.amm.mint.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.amm.mint.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.amm.mint.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(mint.data).toEqualTypeOf<
    Actions.amm.mint.ReturnValue | undefined
  >()
  expectTypeOf(mint.error).toEqualTypeOf<Actions.amm.mint.ErrorType | null>()
  expectTypeOf(mint.variables).toEqualTypeOf<
    Actions.amm.mint.Parameters<typeof config> | undefined
  >()
  expectTypeOf(mint.context).toEqualTypeOf<Context | undefined>()

  mint.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.amm.mint.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.amm.mint.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.amm.mint.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.amm.mint.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.amm.mint.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.amm.mint.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.amm.mint.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.amm.mintSync.Parameters<typeof config>

  const mintSync = amm.useMintSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.amm.mintSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.amm.mintSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.amm.mintSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.amm.mintSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.amm.mintSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.amm.mintSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.amm.mintSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.amm.mintSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(mintSync.data).toEqualTypeOf<
    Actions.amm.mintSync.ReturnValue | undefined
  >()
  expectTypeOf(
    mintSync.error,
  ).toEqualTypeOf<Actions.amm.mintSync.ErrorType | null>()
  expectTypeOf(mintSync.variables).toEqualTypeOf<
    Actions.amm.mintSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(mintSync.context).toEqualTypeOf<Context | undefined>()

  mintSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.amm.mintSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.amm.mintSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.amm.mintSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.amm.mintSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.amm.mintSync.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.amm.mintSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.amm.mintSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useBurn', () => {
  const variables = {} as Actions.amm.burn.Parameters<typeof config>

  const burn = amm.useBurn({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.amm.burn.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.amm.burn.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.amm.burn.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.amm.burn.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.amm.burn.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.amm.burn.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.amm.burn.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.amm.burn.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(burn.data).toEqualTypeOf<
    Actions.amm.burn.ReturnValue | undefined
  >()
  expectTypeOf(burn.error).toEqualTypeOf<Actions.amm.burn.ErrorType | null>()
  expectTypeOf(burn.variables).toEqualTypeOf<
    Actions.amm.burn.Parameters<typeof config> | undefined
  >()
  expectTypeOf(burn.context).toEqualTypeOf<Context | undefined>()

  burn.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.amm.burn.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.amm.burn.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.amm.burn.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.amm.burn.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.amm.burn.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.amm.burn.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.amm.burn.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.amm.burnSync.Parameters<typeof config>

  const burnSync = amm.useBurnSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.amm.burnSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.amm.burnSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.amm.burnSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.amm.burnSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.amm.burnSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.amm.burnSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.amm.burnSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.amm.burnSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(burnSync.data).toEqualTypeOf<
    Actions.amm.burnSync.ReturnValue | undefined
  >()
  expectTypeOf(
    burnSync.error,
  ).toEqualTypeOf<Actions.amm.burnSync.ErrorType | null>()
  expectTypeOf(burnSync.variables).toEqualTypeOf<
    Actions.amm.burnSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(burnSync.context).toEqualTypeOf<Context | undefined>()

  burnSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.amm.burnSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.amm.burnSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.amm.burnSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.amm.burnSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.amm.burnSync.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.amm.burnSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.amm.burnSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWatchRebalanceSwap', () => {
  amm.useWatchRebalanceSwap({
    config,
    enabled: true,
    onRebalanceSwap(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchMint', () => {
  amm.useWatchMint({
    config,
    enabled: true,
    onMint(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchBurn', () => {
  amm.useWatchBurn({
    config,
    enabled: true,
    onBurn(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})
