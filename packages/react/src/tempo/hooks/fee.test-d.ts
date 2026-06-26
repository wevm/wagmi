import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as fee from './fee.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useUserToken', () => {
  const result = fee.useUserToken({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.fee.getUserToken.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useSetUserToken', () => {
  const variables = {} as Actions.fee.setUserToken.Parameters<typeof config>

  const setUserToken = fee.useSetUserToken({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserToken.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.fee.setUserToken.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.fee.setUserToken.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.fee.setUserToken.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.fee.setUserToken.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setUserToken.data).toEqualTypeOf<
    Actions.fee.setUserToken.ReturnValue | undefined
  >()
  expectTypeOf(
    setUserToken.error,
  ).toEqualTypeOf<Actions.fee.setUserToken.ErrorType | null>()
  expectTypeOf(setUserToken.variables).toEqualTypeOf<
    Actions.fee.setUserToken.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setUserToken.context).toEqualTypeOf<Context | undefined>()

  setUserToken.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.fee.setUserToken.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.fee.setUserToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.fee.setUserToken.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.fee.setUserToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.fee.setUserToken.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.fee.setUserToken.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.fee.setUserToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.fee.setUserTokenSync.Parameters<
    typeof config
  >

  const setUserTokenSync = fee.useSetUserTokenSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserTokenSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.fee.setUserTokenSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.fee.setUserTokenSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.fee.setUserTokenSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.fee.setUserTokenSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.fee.setUserTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setUserTokenSync.data).toEqualTypeOf<
    Actions.fee.setUserTokenSync.ReturnValue | undefined
  >()
  expectTypeOf(
    setUserTokenSync.error,
  ).toEqualTypeOf<Actions.fee.setUserTokenSync.ErrorType | null>()
  expectTypeOf(setUserTokenSync.variables).toEqualTypeOf<
    Actions.fee.setUserTokenSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setUserTokenSync.context).toEqualTypeOf<Context | undefined>()

  setUserTokenSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.fee.setUserTokenSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.fee.setUserTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.fee.setUserTokenSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.fee.setUserTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.fee.setUserTokenSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.fee.setUserTokenSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.fee.setUserTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWatchSetUserToken', () => {
  fee.useWatchSetUserToken({
    config,
    enabled: true,
    onUserTokenSet(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})
