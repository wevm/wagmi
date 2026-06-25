import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as faucet from './faucet.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useFund', () => {
  const variables = {} as Actions.faucet.fund.Parameters<typeof config>

  const fund = faucet.useFund({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fund.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.faucet.fund.ErrorType>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fund.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.faucet.fund.ReturnValue>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fund.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.faucet.fund.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.faucet.fund.ErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fund.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(fund.data).toEqualTypeOf<
    Actions.faucet.fund.ReturnValue | undefined
  >()
  expectTypeOf(fund.error).toEqualTypeOf<Actions.faucet.fund.ErrorType | null>()
  expectTypeOf(fund.variables).toEqualTypeOf<
    Actions.faucet.fund.Parameters<typeof config> | undefined
  >()
  expectTypeOf(fund.context).toEqualTypeOf<Context | undefined>()

  fund.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.faucet.fund.ErrorType>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.faucet.fund.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.faucet.fund.ReturnValue>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.faucet.fund.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.faucet.fund.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.faucet.fund.ErrorType | null>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.faucet.fund.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.faucet.fundSync.Parameters<typeof config>

  const fundSync = faucet.useFundSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fundSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.faucet.fundSync.ErrorType>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fundSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.faucet.fundSync.ReturnValue>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fundSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.faucet.fundSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.faucet.fundSync.ErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.faucet.fundSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(fundSync.data).toEqualTypeOf<
    Actions.faucet.fundSync.ReturnValue | undefined
  >()
  expectTypeOf(
    fundSync.error,
  ).toEqualTypeOf<Actions.faucet.fundSync.ErrorType | null>()
  expectTypeOf(fundSync.variables).toEqualTypeOf<
    Actions.faucet.fundSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(fundSync.context).toEqualTypeOf<Context | undefined>()

  fundSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.faucet.fundSync.ErrorType>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.faucet.fundSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.faucet.fundSync.ReturnValue>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.faucet.fundSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.faucet.fundSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.faucet.fundSync.ErrorType | null>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.faucet.fundSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})
