import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as wallet from './wallet.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useTransfer', () => {
  const variables = {} as Actions.wallet.transfer.Parameters<typeof config>

  const transfer = wallet.useTransfer({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.transfer.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.wallet.transfer.ErrorType>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.transfer.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.wallet.transfer.ReturnValue>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.transfer.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.wallet.transfer.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.wallet.transfer.ErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.transfer.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(transfer.data).toEqualTypeOf<
    Actions.wallet.transfer.ReturnValue | undefined
  >()
  expectTypeOf(
    transfer.error,
  ).toEqualTypeOf<Actions.wallet.transfer.ErrorType | null>()
  expectTypeOf(transfer.variables).toEqualTypeOf<
    Actions.wallet.transfer.Parameters<typeof config> | undefined
  >()
  expectTypeOf(transfer.context).toEqualTypeOf<Context | undefined>()

  transfer.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.wallet.transfer.ErrorType>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.transfer.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.wallet.transfer.ReturnValue>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.transfer.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.wallet.transfer.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.wallet.transfer.ErrorType | null>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.transfer.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useSwap', () => {
  const variables = {} as Actions.wallet.swap.Parameters<typeof config>

  const swap = wallet.useSwap({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.swap.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.wallet.swap.ErrorType>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.swap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.wallet.swap.ReturnValue>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.swap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.wallet.swap.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.wallet.swap.ErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.swap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(swap.data).toEqualTypeOf<
    Actions.wallet.swap.ReturnValue | undefined
  >()
  expectTypeOf(swap.error).toEqualTypeOf<Actions.wallet.swap.ErrorType | null>()
  expectTypeOf(swap.variables).toEqualTypeOf<
    Actions.wallet.swap.Parameters<typeof config> | undefined
  >()
  expectTypeOf(swap.context).toEqualTypeOf<Context | undefined>()

  swap.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.wallet.swap.ErrorType>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.swap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.wallet.swap.ReturnValue>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.swap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.wallet.swap.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.wallet.swap.ErrorType | null>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.swap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useDeposit', () => {
  const variables = {} as Actions.wallet.deposit.Parameters<typeof config>

  const deposit = wallet.useDeposit({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.deposit.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.wallet.deposit.ErrorType>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.deposit.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.wallet.deposit.ReturnValue>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.deposit.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.wallet.deposit.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.wallet.deposit.ErrorType | null>()
        expectTypeOf(variables).toEqualTypeOf<
          Actions.wallet.deposit.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(deposit.data).toEqualTypeOf<
    Actions.wallet.deposit.ReturnValue | undefined
  >()
  expectTypeOf(
    deposit.error,
  ).toEqualTypeOf<Actions.wallet.deposit.ErrorType | null>()
  expectTypeOf(deposit.variables).toEqualTypeOf<
    Actions.wallet.deposit.Parameters<typeof config> | undefined
  >()
  expectTypeOf(deposit.context).toEqualTypeOf<Context | undefined>()

  deposit.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.wallet.deposit.ErrorType>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.deposit.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.wallet.deposit.ReturnValue>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.deposit.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.wallet.deposit.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.wallet.deposit.ErrorType | null>()
      expectTypeOf(variables).toEqualTypeOf<
        Actions.wallet.deposit.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})
