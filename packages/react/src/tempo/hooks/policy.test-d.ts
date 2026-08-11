import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as policy from './policy.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useData', () => {
  const result = policy.useData({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.policy.getData.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useIsAuthorized', () => {
  const result = policy.useIsAuthorized({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.isAuthorized.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useCreate', () => {
  const variables = {} as Actions.policy.create.Parameters<typeof config>

  const create = policy.useCreate({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.create.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.policy.create.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.create.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.policy.create.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.create.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.create.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.create.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.create.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(create.data).toEqualTypeOf<
    Actions.policy.create.ReturnValue | undefined
  >()
  expectTypeOf(
    create.error,
  ).toEqualTypeOf<Actions.policy.create.ErrorType | null>()
  expectTypeOf(create.variables).toEqualTypeOf<
    Actions.policy.create.Parameters<typeof config> | undefined
  >()
  expectTypeOf(create.context).toEqualTypeOf<Context | undefined>()

  create.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.policy.create.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.create.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.policy.create.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.create.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.create.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.create.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.create.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.policy.createSync.Parameters<
    typeof config
  >

  const createSync = policy.useCreateSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.createSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.policy.createSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.createSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.createSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.createSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.createSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.createSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.createSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(createSync.data).toEqualTypeOf<
    Actions.policy.createSync.ReturnValue | undefined
  >()
  expectTypeOf(
    createSync.error,
  ).toEqualTypeOf<Actions.policy.createSync.ErrorType | null>()
  expectTypeOf(createSync.variables).toEqualTypeOf<
    Actions.policy.createSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(createSync.context).toEqualTypeOf<Context | undefined>()

  createSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.policy.createSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.createSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.policy.createSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.createSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.createSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.createSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.createSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useSetAdmin', () => {
  const variables = {} as Actions.policy.setAdmin.Parameters<typeof config>

  const setAdmin = policy.useSetAdmin({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdmin.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.policy.setAdmin.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdmin.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.policy.setAdmin.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdmin.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.setAdmin.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.setAdmin.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdmin.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setAdmin.data).toEqualTypeOf<
    Actions.policy.setAdmin.ReturnValue | undefined
  >()
  expectTypeOf(
    setAdmin.error,
  ).toEqualTypeOf<Actions.policy.setAdmin.ErrorType | null>()
  expectTypeOf(setAdmin.variables).toEqualTypeOf<
    Actions.policy.setAdmin.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setAdmin.context).toEqualTypeOf<Context | undefined>()

  setAdmin.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.policy.setAdmin.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.setAdmin.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.policy.setAdmin.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.setAdmin.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.setAdmin.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.setAdmin.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.setAdmin.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.policy.setAdminSync.Parameters<
    typeof config
  >

  const setAdminSync = policy.useSetAdminSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdminSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.setAdminSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdminSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.setAdminSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdminSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.setAdminSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.setAdminSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.setAdminSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setAdminSync.data).toEqualTypeOf<
    Actions.policy.setAdminSync.ReturnValue | undefined
  >()
  expectTypeOf(
    setAdminSync.error,
  ).toEqualTypeOf<Actions.policy.setAdminSync.ErrorType | null>()
  expectTypeOf(setAdminSync.variables).toEqualTypeOf<
    Actions.policy.setAdminSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setAdminSync.context).toEqualTypeOf<Context | undefined>()

  setAdminSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.policy.setAdminSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.setAdminSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.policy.setAdminSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.setAdminSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.setAdminSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.setAdminSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.setAdminSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useModifyWhitelist', () => {
  const variables = {} as Actions.policy.modifyWhitelist.Parameters<
    typeof config
  >

  const modifyWhitelist = policy.useModifyWhitelist({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelist.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyWhitelist.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelist.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.modifyWhitelist.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelist.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.modifyWhitelist.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyWhitelist.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelist.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(modifyWhitelist.data).toEqualTypeOf<
    Actions.policy.modifyWhitelist.ReturnValue | undefined
  >()
  expectTypeOf(
    modifyWhitelist.error,
  ).toEqualTypeOf<Actions.policy.modifyWhitelist.ErrorType | null>()
  expectTypeOf(modifyWhitelist.variables).toEqualTypeOf<
    Actions.policy.modifyWhitelist.Parameters<typeof config> | undefined
  >()
  expectTypeOf(modifyWhitelist.context).toEqualTypeOf<Context | undefined>()

  modifyWhitelist.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyWhitelist.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyWhitelist.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.policy.modifyWhitelist.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyWhitelist.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.modifyWhitelist.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyWhitelist.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyWhitelist.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.policy.modifyWhitelistSync.Parameters<
    typeof config
  >

  const modifyWhitelistSync = policy.useModifyWhitelistSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelistSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelistSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelistSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.modifyWhitelistSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyWhitelistSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(modifyWhitelistSync.data).toEqualTypeOf<
    Actions.policy.modifyWhitelistSync.ReturnValue | undefined
  >()
  expectTypeOf(
    modifyWhitelistSync.error,
  ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ErrorType | null>()
  expectTypeOf(modifyWhitelistSync.variables).toEqualTypeOf<
    Actions.policy.modifyWhitelistSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(modifyWhitelistSync.context).toEqualTypeOf<Context | undefined>()

  modifyWhitelistSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyWhitelistSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyWhitelistSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.modifyWhitelistSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyWhitelistSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyWhitelistSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useModifyBlacklist', () => {
  const variables = {} as Actions.policy.modifyBlacklist.Parameters<
    typeof config
  >

  const modifyBlacklist = policy.useModifyBlacklist({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklist.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyBlacklist.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklist.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.modifyBlacklist.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklist.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.modifyBlacklist.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyBlacklist.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklist.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(modifyBlacklist.data).toEqualTypeOf<
    Actions.policy.modifyBlacklist.ReturnValue | undefined
  >()
  expectTypeOf(
    modifyBlacklist.error,
  ).toEqualTypeOf<Actions.policy.modifyBlacklist.ErrorType | null>()
  expectTypeOf(modifyBlacklist.variables).toEqualTypeOf<
    Actions.policy.modifyBlacklist.Parameters<typeof config> | undefined
  >()
  expectTypeOf(modifyBlacklist.context).toEqualTypeOf<Context | undefined>()

  modifyBlacklist.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyBlacklist.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyBlacklist.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.policy.modifyBlacklist.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyBlacklist.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.modifyBlacklist.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyBlacklist.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyBlacklist.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.policy.modifyBlacklistSync.Parameters<
    typeof config
  >

  const modifyBlacklistSync = policy.useModifyBlacklistSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklistSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklistSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklistSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.policy.modifyBlacklistSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.policy.modifyBlacklistSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(modifyBlacklistSync.data).toEqualTypeOf<
    Actions.policy.modifyBlacklistSync.ReturnValue | undefined
  >()
  expectTypeOf(
    modifyBlacklistSync.error,
  ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ErrorType | null>()
  expectTypeOf(modifyBlacklistSync.variables).toEqualTypeOf<
    Actions.policy.modifyBlacklistSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(modifyBlacklistSync.context).toEqualTypeOf<Context | undefined>()

  modifyBlacklistSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyBlacklistSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyBlacklistSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.policy.modifyBlacklistSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.policy.modifyBlacklistSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.policy.modifyBlacklistSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWatchCreate', () => {
  policy.useWatchCreate({
    config,
    enabled: true,
    onPolicyCreated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchAdminUpdated', () => {
  policy.useWatchAdminUpdated({
    config,
    enabled: true,
    onAdminUpdated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchWhitelistUpdated', () => {
  policy.useWatchWhitelistUpdated({
    config,
    enabled: true,
    onWhitelistUpdated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchBlacklistUpdated', () => {
  policy.useWatchBlacklistUpdated({
    config,
    enabled: true,
    onBlacklistUpdated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})
