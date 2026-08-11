import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as dex from './dex.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useBalance', () => {
  const result = dex.useBalance({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.getBalance.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useBuyQuote', () => {
  const result = dex.useBuyQuote({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.getBuyQuote.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useOrder', () => {
  const result = dex.useOrder({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.getOrder.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useOrderbook', () => {
  const result = dex.useOrderbook({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.getOrderbook.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useTickLevel', () => {
  const result = dex.useTickLevel({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.getTickLevel.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useSellQuote', () => {
  const result = dex.useSellQuote({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.getSellQuote.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useBuy', () => {
  const variables = {} as Actions.dex.buy.Parameters<typeof config>

  const buy = dex.useBuy({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.buy.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.buy.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.buy.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.buy.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.buy.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.buy.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.dex.buy.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.buy.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(buy.data).toEqualTypeOf<
    Actions.dex.buy.ReturnValue | undefined
  >()
  expectTypeOf(buy.error).toEqualTypeOf<Actions.dex.buy.ErrorType | null>()
  expectTypeOf(buy.variables).toEqualTypeOf<
    Actions.dex.buy.Parameters<typeof config> | undefined
  >()
  expectTypeOf(buy.context).toEqualTypeOf<Context | undefined>()

  buy.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.buy.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.buy.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.buy.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.buy.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.buy.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.buy.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.buy.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.buySync.Parameters<typeof config>

  const buySync = dex.useBuySync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.buySync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.buySync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.buySync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.buySync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.buySync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.buySync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.buySync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.buySync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(buySync.data).toEqualTypeOf<
    Actions.dex.buySync.ReturnValue | undefined
  >()
  expectTypeOf(
    buySync.error,
  ).toEqualTypeOf<Actions.dex.buySync.ErrorType | null>()
  expectTypeOf(buySync.variables).toEqualTypeOf<
    Actions.dex.buySync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(buySync.context).toEqualTypeOf<Context | undefined>()

  buySync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.buySync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.buySync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.buySync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.buySync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.buySync.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.buySync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.buySync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useCancel', () => {
  const variables = {} as Actions.dex.cancel.Parameters<typeof config>

  const cancel = dex.useCancel({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.cancel.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.cancel.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancel.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.cancel.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancel.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.cancel.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.dex.cancel.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancel.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(cancel.data).toEqualTypeOf<
    Actions.dex.cancel.ReturnValue | undefined
  >()
  expectTypeOf(
    cancel.error,
  ).toEqualTypeOf<Actions.dex.cancel.ErrorType | null>()
  expectTypeOf(cancel.variables).toEqualTypeOf<
    Actions.dex.cancel.Parameters<typeof config> | undefined
  >()
  expectTypeOf(cancel.context).toEqualTypeOf<Context | undefined>()

  cancel.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.cancel.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancel.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.cancel.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancel.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.cancel.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.cancel.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancel.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.cancelSync.Parameters<typeof config>

  const cancelSync = dex.useCancelSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.cancelSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.cancelSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.cancelSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.cancelSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(cancelSync.data).toEqualTypeOf<
    Actions.dex.cancelSync.ReturnValue | undefined
  >()
  expectTypeOf(
    cancelSync.error,
  ).toEqualTypeOf<Actions.dex.cancelSync.ErrorType | null>()
  expectTypeOf(cancelSync.variables).toEqualTypeOf<
    Actions.dex.cancelSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(cancelSync.context).toEqualTypeOf<Context | undefined>()

  cancelSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.cancelSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.cancelSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.cancelSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.cancelSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useCancelStale', () => {
  const variables = {} as Actions.dex.cancelStale.Parameters<typeof config>

  const cancelStale = dex.useCancelStale({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStale.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.cancelStale.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStale.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.cancelStale.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStale.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.cancelStale.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.cancelStale.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStale.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(cancelStale.data).toEqualTypeOf<
    Actions.dex.cancelStale.ReturnValue | undefined
  >()
  expectTypeOf(
    cancelStale.error,
  ).toEqualTypeOf<Actions.dex.cancelStale.ErrorType | null>()
  expectTypeOf(cancelStale.variables).toEqualTypeOf<
    Actions.dex.cancelStale.Parameters<typeof config> | undefined
  >()
  expectTypeOf(cancelStale.context).toEqualTypeOf<Context | undefined>()

  cancelStale.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.cancelStale.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelStale.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.cancelStale.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelStale.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.cancelStale.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.cancelStale.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelStale.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.cancelStaleSync.Parameters<
    typeof config
  >

  const cancelStaleSync = dex.useCancelStaleSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStaleSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.cancelStaleSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStaleSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.dex.cancelStaleSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStaleSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.cancelStaleSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.cancelStaleSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.cancelStaleSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(cancelStaleSync.data).toEqualTypeOf<
    Actions.dex.cancelStaleSync.ReturnValue | undefined
  >()
  expectTypeOf(
    cancelStaleSync.error,
  ).toEqualTypeOf<Actions.dex.cancelStaleSync.ErrorType | null>()
  expectTypeOf(cancelStaleSync.variables).toEqualTypeOf<
    Actions.dex.cancelStaleSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(cancelStaleSync.context).toEqualTypeOf<Context | undefined>()

  cancelStaleSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.cancelStaleSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelStaleSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.dex.cancelStaleSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelStaleSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.cancelStaleSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.cancelStaleSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.cancelStaleSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useCreatePair', () => {
  const variables = {} as Actions.dex.createPair.Parameters<typeof config>

  const createPair = dex.useCreatePair({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.createPair.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.createPair.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.createPair.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.createPair.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.createPair.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.createPair.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.createPair.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.createPair.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(createPair.data).toEqualTypeOf<
    Actions.dex.createPair.ReturnValue | undefined
  >()
  expectTypeOf(
    createPair.error,
  ).toEqualTypeOf<Actions.dex.createPair.ErrorType | null>()
  expectTypeOf(createPair.variables).toEqualTypeOf<
    Actions.dex.createPair.Parameters<typeof config> | undefined
  >()
  expectTypeOf(createPair.context).toEqualTypeOf<Context | undefined>()

  createPair.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.createPair.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.createPair.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.createPair.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.createPair.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.createPair.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.createPair.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.createPair.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.createPairSync.Parameters<
    typeof config
  >

  const createPairSync = dex.useCreatePairSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.createPairSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.createPairSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.createPairSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.dex.createPairSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.createPairSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.createPairSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.createPairSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.createPairSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(createPairSync.data).toEqualTypeOf<
    Actions.dex.createPairSync.ReturnValue | undefined
  >()
  expectTypeOf(
    createPairSync.error,
  ).toEqualTypeOf<Actions.dex.createPairSync.ErrorType | null>()
  expectTypeOf(createPairSync.variables).toEqualTypeOf<
    Actions.dex.createPairSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(createPairSync.context).toEqualTypeOf<Context | undefined>()

  createPairSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.createPairSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.createPairSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.createPairSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.createPairSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.createPairSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.createPairSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.createPairSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('usePlace', () => {
  const variables = {} as Actions.dex.place.Parameters<typeof config>

  const place = dex.usePlace({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.place.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.place.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.place.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.place.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.place.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.place.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.dex.place.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.place.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(place.data).toEqualTypeOf<
    Actions.dex.place.ReturnValue | undefined
  >()
  expectTypeOf(place.error).toEqualTypeOf<Actions.dex.place.ErrorType | null>()
  expectTypeOf(place.variables).toEqualTypeOf<
    Actions.dex.place.Parameters<typeof config> | undefined
  >()
  expectTypeOf(place.context).toEqualTypeOf<Context | undefined>()

  place.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.place.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.place.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.place.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.place.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.place.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.place.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.place.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.placeSync.Parameters<typeof config>

  const placeSync = dex.usePlaceSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.placeSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.placeSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.placeSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.placeSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.placeSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(placeSync.data).toEqualTypeOf<
    Actions.dex.placeSync.ReturnValue | undefined
  >()
  expectTypeOf(
    placeSync.error,
  ).toEqualTypeOf<Actions.dex.placeSync.ErrorType | null>()
  expectTypeOf(placeSync.variables).toEqualTypeOf<
    Actions.dex.placeSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(placeSync.context).toEqualTypeOf<Context | undefined>()

  placeSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.placeSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.placeSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.placeSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.placeSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('usePlaceFlip', () => {
  const variables = {} as Actions.dex.placeFlip.Parameters<typeof config>

  const placeFlip = dex.usePlaceFlip({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlip.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.placeFlip.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlip.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.placeFlip.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlip.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.placeFlip.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.placeFlip.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlip.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(placeFlip.data).toEqualTypeOf<
    Actions.dex.placeFlip.ReturnValue | undefined
  >()
  expectTypeOf(
    placeFlip.error,
  ).toEqualTypeOf<Actions.dex.placeFlip.ErrorType | null>()
  expectTypeOf(placeFlip.variables).toEqualTypeOf<
    Actions.dex.placeFlip.Parameters<typeof config> | undefined
  >()
  expectTypeOf(placeFlip.context).toEqualTypeOf<Context | undefined>()

  placeFlip.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.placeFlip.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeFlip.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.placeFlip.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeFlip.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.placeFlip.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.placeFlip.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeFlip.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.placeFlipSync.Parameters<
    typeof config
  >

  const placeFlipSync = dex.usePlaceFlipSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlipSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.placeFlipSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlipSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.dex.placeFlipSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlipSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.placeFlipSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.placeFlipSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.placeFlipSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(placeFlipSync.data).toEqualTypeOf<
    Actions.dex.placeFlipSync.ReturnValue | undefined
  >()
  expectTypeOf(
    placeFlipSync.error,
  ).toEqualTypeOf<Actions.dex.placeFlipSync.ErrorType | null>()
  expectTypeOf(placeFlipSync.variables).toEqualTypeOf<
    Actions.dex.placeFlipSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(placeFlipSync.context).toEqualTypeOf<Context | undefined>()

  placeFlipSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.placeFlipSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeFlipSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.placeFlipSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeFlipSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.placeFlipSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.placeFlipSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.placeFlipSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useSell', () => {
  const variables = {} as Actions.dex.sell.Parameters<typeof config>

  const sell = dex.useSell({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.sell.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.sell.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.sell.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.sell.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.sell.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.sell.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.dex.sell.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.sell.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(sell.data).toEqualTypeOf<
    Actions.dex.sell.ReturnValue | undefined
  >()
  expectTypeOf(sell.error).toEqualTypeOf<Actions.dex.sell.ErrorType | null>()
  expectTypeOf(sell.variables).toEqualTypeOf<
    Actions.dex.sell.Parameters<typeof config> | undefined
  >()
  expectTypeOf(sell.context).toEqualTypeOf<Context | undefined>()

  sell.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.sell.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.sell.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.sell.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.sell.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.sell.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.sell.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.sell.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.sellSync.Parameters<typeof config>

  const sellSync = dex.useSellSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.sellSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.sellSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.sellSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.sellSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.sellSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.sellSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.sellSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.sellSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(sellSync.data).toEqualTypeOf<
    Actions.dex.sellSync.ReturnValue | undefined
  >()
  expectTypeOf(
    sellSync.error,
  ).toEqualTypeOf<Actions.dex.sellSync.ErrorType | null>()
  expectTypeOf(sellSync.variables).toEqualTypeOf<
    Actions.dex.sellSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(sellSync.context).toEqualTypeOf<Context | undefined>()

  sellSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.sellSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.sellSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.sellSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.sellSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.sellSync.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.sellSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.sellSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWithdraw', () => {
  const variables = {} as Actions.dex.withdraw.Parameters<typeof config>

  const withdraw = dex.useWithdraw({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.withdraw.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.withdraw.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.withdraw.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.withdraw.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.withdraw.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.withdraw.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.withdraw.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.withdraw.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(withdraw.data).toEqualTypeOf<
    Actions.dex.withdraw.ReturnValue | undefined
  >()
  expectTypeOf(
    withdraw.error,
  ).toEqualTypeOf<Actions.dex.withdraw.ErrorType | null>()
  expectTypeOf(withdraw.variables).toEqualTypeOf<
    Actions.dex.withdraw.Parameters<typeof config> | undefined
  >()
  expectTypeOf(withdraw.context).toEqualTypeOf<Context | undefined>()

  withdraw.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.withdraw.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.withdraw.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.withdraw.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.withdraw.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.withdraw.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.dex.withdraw.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.withdraw.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.dex.withdrawSync.Parameters<typeof config>

  const withdrawSync = dex.useWithdrawSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.dex.withdrawSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.dex.withdrawSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.dex.withdrawSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.dex.withdrawSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.dex.withdrawSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.dex.withdrawSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.dex.withdrawSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.dex.withdrawSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(withdrawSync.data).toEqualTypeOf<
    Actions.dex.withdrawSync.ReturnValue | undefined
  >()
  expectTypeOf(
    withdrawSync.error,
  ).toEqualTypeOf<Actions.dex.withdrawSync.ErrorType | null>()
  expectTypeOf(withdrawSync.variables).toEqualTypeOf<
    Actions.dex.withdrawSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(withdrawSync.context).toEqualTypeOf<Context | undefined>()

  withdrawSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.dex.withdrawSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.dex.withdrawSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.dex.withdrawSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.dex.withdrawSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.dex.withdrawSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.dex.withdrawSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.dex.withdrawSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWatchFlipOrderPlaced', () => {
  dex.useWatchFlipOrderPlaced({
    config,
    enabled: true,
    onFlipOrderPlaced(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchOrderCancelled', () => {
  dex.useWatchOrderCancelled({
    config,
    enabled: true,
    onOrderCancelled(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchOrderFilled', () => {
  dex.useWatchOrderFilled({
    config,
    enabled: true,
    onOrderFilled(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchOrderPlaced', () => {
  dex.useWatchOrderPlaced({
    config,
    enabled: true,
    onOrderPlaced(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})
