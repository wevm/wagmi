import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as reward from './reward.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useGetGlobalRewardPerToken', () => {
  const result = reward.useGetGlobalRewardPerToken({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.reward.getGlobalRewardPerToken.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useUserRewardInfo', () => {
  const result = reward.useUserRewardInfo({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.reward.getUserRewardInfo.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useClaim', () => {
  const variables = {} as Actions.reward.claim.Parameters<typeof config>

  const claim = reward.useClaim({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.reward.claim.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.reward.claim.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.reward.claim.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.reward.claim.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.reward.claim.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.reward.claim.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.claim.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.reward.claim.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(claim.data).toEqualTypeOf<
    Actions.reward.claim.ReturnValue | undefined
  >()
  expectTypeOf(
    claim.error,
  ).toEqualTypeOf<Actions.reward.claim.ErrorType | null>()
  expectTypeOf(claim.variables).toEqualTypeOf<
    Actions.reward.claim.Parameters<typeof config> | undefined
  >()
  expectTypeOf(claim.context).toEqualTypeOf<Context | undefined>()

  claim.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.reward.claim.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.reward.claim.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.reward.claim.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.reward.claim.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.reward.claim.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.reward.claim.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.reward.claim.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.reward.claimSync.Parameters<typeof config>

  const claimSync = reward.useClaimSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.reward.claimSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.reward.claimSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.reward.claimSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.reward.claimSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.reward.claimSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.reward.claimSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.claimSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.reward.claimSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(claimSync.data).toEqualTypeOf<
    Actions.reward.claimSync.ReturnValue | undefined
  >()
  expectTypeOf(
    claimSync.error,
  ).toEqualTypeOf<Actions.reward.claimSync.ErrorType | null>()
  expectTypeOf(claimSync.variables).toEqualTypeOf<
    Actions.reward.claimSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(claimSync.context).toEqualTypeOf<Context | undefined>()

  claimSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.reward.claimSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.reward.claimSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.reward.claimSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.reward.claimSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.reward.claimSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.claimSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.reward.claimSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useSetRecipient', () => {
  const variables = {} as Actions.reward.setRecipient.Parameters<typeof config>

  const setRecipient = reward.useSetRecipient({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipient.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.setRecipient.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipient.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.reward.setRecipient.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipient.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.reward.setRecipient.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.setRecipient.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipient.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setRecipient.data).toEqualTypeOf<
    Actions.reward.setRecipient.ReturnValue | undefined
  >()
  expectTypeOf(
    setRecipient.error,
  ).toEqualTypeOf<Actions.reward.setRecipient.ErrorType | null>()
  expectTypeOf(setRecipient.variables).toEqualTypeOf<
    Actions.reward.setRecipient.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setRecipient.context).toEqualTypeOf<Context | undefined>()

  setRecipient.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.reward.setRecipient.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.reward.setRecipient.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.reward.setRecipient.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.reward.setRecipient.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.reward.setRecipient.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.setRecipient.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.reward.setRecipient.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.reward.setRecipientSync.Parameters<
    typeof config
  >

  const setRecipientSync = reward.useSetRecipientSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipientSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.setRecipientSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipientSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.reward.setRecipientSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipientSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.reward.setRecipientSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.setRecipientSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.reward.setRecipientSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setRecipientSync.data).toEqualTypeOf<
    Actions.reward.setRecipientSync.ReturnValue | undefined
  >()
  expectTypeOf(
    setRecipientSync.error,
  ).toEqualTypeOf<Actions.reward.setRecipientSync.ErrorType | null>()
  expectTypeOf(setRecipientSync.variables).toEqualTypeOf<
    Actions.reward.setRecipientSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setRecipientSync.context).toEqualTypeOf<Context | undefined>()

  setRecipientSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.setRecipientSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.reward.setRecipientSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.reward.setRecipientSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.reward.setRecipientSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.reward.setRecipientSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.setRecipientSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.reward.setRecipientSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useDistribute', () => {
  const variables = {} as Actions.reward.distribute.Parameters<typeof config>

  const distribute = reward.useDistribute({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.reward.distribute.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.reward.distribute.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.reward.distribute.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.reward.distribute.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.reward.distribute.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.reward.distribute.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.distribute.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.reward.distribute.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(distribute.data).toEqualTypeOf<
    Actions.reward.distribute.ReturnValue | undefined
  >()
  expectTypeOf(
    distribute.error,
  ).toEqualTypeOf<Actions.reward.distribute.ErrorType | null>()
  expectTypeOf(distribute.variables).toEqualTypeOf<
    Actions.reward.distribute.Parameters<typeof config> | undefined
  >()
  expectTypeOf(distribute.context).toEqualTypeOf<Context | undefined>()

  distribute.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.reward.distribute.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.reward.distribute.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.reward.distribute.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.reward.distribute.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.reward.distribute.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.distribute.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.reward.distribute.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.reward.distributeSync.Parameters<
    typeof config
  >

  const distributeSync = reward.useDistributeSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.reward.distributeSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.distributeSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.reward.distributeSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.reward.distributeSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.reward.distributeSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.reward.distributeSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.reward.distributeSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.reward.distributeSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(distributeSync.data).toEqualTypeOf<
    Actions.reward.distributeSync.ReturnValue | undefined
  >()
  expectTypeOf(
    distributeSync.error,
  ).toEqualTypeOf<Actions.reward.distributeSync.ErrorType | null>()
  expectTypeOf(distributeSync.variables).toEqualTypeOf<
    Actions.reward.distributeSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(distributeSync.context).toEqualTypeOf<Context | undefined>()

  distributeSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.distributeSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.reward.distributeSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.reward.distributeSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.reward.distributeSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.reward.distributeSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.reward.distributeSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.reward.distributeSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWatchRewardDistributed', () => {
  reward.useWatchRewardDistributed({
    config,
    enabled: true,
    onRewardDistributed(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchRewardRecipientSet', () => {
  reward.useWatchRewardRecipientSet({
    config,
    enabled: true,
    onRewardRecipientSet(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})
