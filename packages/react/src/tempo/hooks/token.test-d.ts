import { createConfig, http } from '@wagmi/core'
import type { Actions } from '@wagmi/core/tempo'
import { defineChain } from 'viem'
import { tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'
import * as token from './token.js'

const tempo = defineChain({ ...tempoLocalnet, id: 1337 as number })
const contextValue = { foo: 'bar' } as const
const selected = 'selected' as const

const config = createConfig({
  chains: [tempo],
  transports: { [tempo.id]: http() },
})

type Context = typeof contextValue

test('useGetAllowance', () => {
  const result = token.useGetAllowance({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.getAllowance.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useGetBalance', () => {
  const result = token.useGetBalance({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.getBalance.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useGetMetadata', () => {
  const result = token.useGetMetadata({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.getMetadata.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useGetRoleAdmin', () => {
  const result = token.useGetRoleAdmin({
    config,
    query: {
      select(data) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.getRoleAdmin.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useHasRole', () => {
  const result = token.useHasRole({
    config,
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.hasRole.ReturnValue>()
        return selected
      },
    },
  })

  expectTypeOf(result.data).toEqualTypeOf<typeof selected | undefined>()
})

test('useApprove', () => {
  const variables = {} as Actions.token.approve.Parameters<typeof config>

  const approve = token.useApprove({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.approve.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.approve.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.approve.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.approve.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.approve.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.approve.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.approve.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.approve.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(approve.data).toEqualTypeOf<
    Actions.token.approve.ReturnValue | undefined
  >()
  expectTypeOf(
    approve.error,
  ).toEqualTypeOf<Actions.token.approve.ErrorType | null>()
  expectTypeOf(approve.variables).toEqualTypeOf<
    Actions.token.approve.Parameters<typeof config> | undefined
  >()
  expectTypeOf(approve.context).toEqualTypeOf<Context | undefined>()

  approve.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.approve.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.approve.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.approve.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.approve.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.approve.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.approve.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.approve.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.approveSync.Parameters<
    typeof config
  >

  const approveSync = token.useApproveSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.approveSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.approveSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.approveSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.approveSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.approveSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.approveSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.approveSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.approveSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(approveSync.data).toEqualTypeOf<
    Actions.token.approveSync.ReturnValue | undefined
  >()
  expectTypeOf(
    approveSync.error,
  ).toEqualTypeOf<Actions.token.approveSync.ErrorType | null>()
  expectTypeOf(approveSync.variables).toEqualTypeOf<
    Actions.token.approveSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(approveSync.context).toEqualTypeOf<Context | undefined>()

  approveSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.approveSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.approveSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.approveSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.approveSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.approveSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.approveSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.approveSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useBurn', () => {
  const variables = {} as Actions.token.burn.Parameters<typeof config>

  const burn = token.useBurn({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.burn.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.burn.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.burn.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.burn.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.burn.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.burn.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.token.burn.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.burn.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(burn.data).toEqualTypeOf<
    Actions.token.burn.ReturnValue | undefined
  >()
  expectTypeOf(burn.error).toEqualTypeOf<Actions.token.burn.ErrorType | null>()
  expectTypeOf(burn.variables).toEqualTypeOf<
    Actions.token.burn.Parameters<typeof config> | undefined
  >()
  expectTypeOf(burn.context).toEqualTypeOf<Context | undefined>()

  burn.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.burn.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.burn.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.burn.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.burn.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.burn.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.token.burn.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.burn.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.burnSync.Parameters<typeof config>

  const burnSync = token.useBurnSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.burnSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.burnSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.burnSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.burnSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.burnSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(burnSync.data).toEqualTypeOf<
    Actions.token.burnSync.ReturnValue | undefined
  >()
  expectTypeOf(
    burnSync.error,
  ).toEqualTypeOf<Actions.token.burnSync.ErrorType | null>()
  expectTypeOf(burnSync.variables).toEqualTypeOf<
    Actions.token.burnSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(burnSync.context).toEqualTypeOf<Context | undefined>()

  burnSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.burnSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.burnSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.burnSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.burnSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useBurnBlocked', () => {
  const variables = {} as Actions.token.burnBlocked.Parameters<typeof config>

  const burnBlocked = token.useBurnBlocked({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlocked.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.burnBlocked.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlocked.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.burnBlocked.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlocked.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.burnBlocked.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.burnBlocked.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlocked.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(burnBlocked.data).toEqualTypeOf<
    Actions.token.burnBlocked.ReturnValue | undefined
  >()
  expectTypeOf(
    burnBlocked.error,
  ).toEqualTypeOf<Actions.token.burnBlocked.ErrorType | null>()
  expectTypeOf(burnBlocked.variables).toEqualTypeOf<
    Actions.token.burnBlocked.Parameters<typeof config> | undefined
  >()
  expectTypeOf(burnBlocked.context).toEqualTypeOf<Context | undefined>()

  burnBlocked.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.burnBlocked.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnBlocked.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.burnBlocked.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnBlocked.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.burnBlocked.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.burnBlocked.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnBlocked.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.burnBlockedSync.Parameters<
    typeof config
  >

  const burnBlockedSync = token.useBurnBlockedSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlockedSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.burnBlockedSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlockedSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.burnBlockedSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlockedSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.burnBlockedSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.burnBlockedSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.burnBlockedSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(burnBlockedSync.data).toEqualTypeOf<
    Actions.token.burnBlockedSync.ReturnValue | undefined
  >()
  expectTypeOf(
    burnBlockedSync.error,
  ).toEqualTypeOf<Actions.token.burnBlockedSync.ErrorType | null>()
  expectTypeOf(burnBlockedSync.variables).toEqualTypeOf<
    Actions.token.burnBlockedSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(burnBlockedSync.context).toEqualTypeOf<Context | undefined>()

  burnBlockedSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.burnBlockedSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnBlockedSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.burnBlockedSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnBlockedSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.burnBlockedSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.burnBlockedSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.burnBlockedSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useChangeTransferPolicy', () => {
  const variables = {} as Actions.token.changeTransferPolicy.Parameters<
    typeof config
  >

  const changeTransferPolicy = token.useChangeTransferPolicy({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicy.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.changeTransferPolicy.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicy.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.changeTransferPolicy.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicy.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.changeTransferPolicy.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.changeTransferPolicy.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicy.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(changeTransferPolicy.data).toEqualTypeOf<
    Actions.token.changeTransferPolicy.ReturnValue | undefined
  >()
  expectTypeOf(
    changeTransferPolicy.error,
  ).toEqualTypeOf<Actions.token.changeTransferPolicy.ErrorType | null>()
  expectTypeOf(changeTransferPolicy.variables).toEqualTypeOf<
    Actions.token.changeTransferPolicy.Parameters<typeof config> | undefined
  >()
  expectTypeOf(changeTransferPolicy.context).toEqualTypeOf<
    Context | undefined
  >()

  changeTransferPolicy.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.changeTransferPolicy.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.changeTransferPolicy.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.changeTransferPolicy.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.changeTransferPolicy.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.changeTransferPolicy.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.changeTransferPolicy.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.changeTransferPolicy.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.changeTransferPolicySync.Parameters<
    typeof config
  >

  const changeTransferPolicySync = token.useChangeTransferPolicySync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicySync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicySync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicySync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.changeTransferPolicySync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.changeTransferPolicySync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(changeTransferPolicySync.data).toEqualTypeOf<
    Actions.token.changeTransferPolicySync.ReturnValue | undefined
  >()
  expectTypeOf(
    changeTransferPolicySync.error,
  ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ErrorType | null>()
  expectTypeOf(changeTransferPolicySync.variables).toEqualTypeOf<
    Actions.token.changeTransferPolicySync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(changeTransferPolicySync.context).toEqualTypeOf<
    Context | undefined
  >()

  changeTransferPolicySync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.changeTransferPolicySync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.changeTransferPolicySync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.changeTransferPolicySync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.changeTransferPolicySync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.changeTransferPolicySync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useCreate', () => {
  const variables = {} as Actions.token.create.Parameters<typeof config>

  const create = token.useCreate({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.create.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.create.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.create.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.create.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.create.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.create.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.create.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.create.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(create.data).toEqualTypeOf<
    Actions.token.create.ReturnValue | undefined
  >()
  expectTypeOf(
    create.error,
  ).toEqualTypeOf<Actions.token.create.ErrorType | null>()
  expectTypeOf(create.variables).toEqualTypeOf<
    Actions.token.create.Parameters<typeof config> | undefined
  >()
  expectTypeOf(create.context).toEqualTypeOf<Context | undefined>()

  create.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.create.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.create.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.create.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.create.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.create.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.token.create.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.create.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.createSync.Parameters<typeof config>

  const createSync = token.useCreateSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.createSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.createSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.createSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.createSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.createSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.createSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.createSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.createSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(createSync.data).toEqualTypeOf<
    Actions.token.createSync.ReturnValue | undefined
  >()
  expectTypeOf(
    createSync.error,
  ).toEqualTypeOf<Actions.token.createSync.ErrorType | null>()
  expectTypeOf(createSync.variables).toEqualTypeOf<
    Actions.token.createSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(createSync.context).toEqualTypeOf<Context | undefined>()

  createSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.createSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.createSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.createSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.createSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.createSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.createSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.createSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useUpdateQuoteToken', () => {
  const variables = {} as Actions.token.updateQuoteToken.Parameters<
    typeof config
  >

  const updateQuoteToken = token.useUpdateQuoteToken({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteToken.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.updateQuoteToken.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.updateQuoteToken.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.updateQuoteToken.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.updateQuoteToken.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(updateQuoteToken.data).toEqualTypeOf<
    Actions.token.updateQuoteToken.ReturnValue | undefined
  >()
  expectTypeOf(
    updateQuoteToken.error,
  ).toEqualTypeOf<Actions.token.updateQuoteToken.ErrorType | null>()
  expectTypeOf(updateQuoteToken.variables).toEqualTypeOf<
    Actions.token.updateQuoteToken.Parameters<typeof config> | undefined
  >()
  expectTypeOf(updateQuoteToken.context).toEqualTypeOf<Context | undefined>()

  updateQuoteToken.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.updateQuoteToken.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.updateQuoteToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.updateQuoteToken.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.updateQuoteToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.updateQuoteToken.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.updateQuoteToken.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.updateQuoteToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.updateQuoteTokenSync.Parameters<
    typeof config
  >

  const updateQuoteTokenSync = token.useUpdateQuoteTokenSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteTokenSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.updateQuoteTokenSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.updateQuoteTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(updateQuoteTokenSync.data).toEqualTypeOf<
    Actions.token.updateQuoteTokenSync.ReturnValue | undefined
  >()
  expectTypeOf(
    updateQuoteTokenSync.error,
  ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ErrorType | null>()
  expectTypeOf(updateQuoteTokenSync.variables).toEqualTypeOf<
    Actions.token.updateQuoteTokenSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(updateQuoteTokenSync.context).toEqualTypeOf<
    Context | undefined
  >()

  updateQuoteTokenSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.updateQuoteTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.updateQuoteTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.updateQuoteTokenSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.updateQuoteTokenSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.updateQuoteTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useGrantRoles', () => {
  const variables = {} as Actions.token.grantRoles.Parameters<typeof config>

  const grantRoles = token.useGrantRoles({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.grantRoles.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.grantRoles.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.grantRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.grantRoles.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.grantRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.grantRoles.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.grantRoles.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.grantRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(grantRoles.data).toEqualTypeOf<
    Actions.token.grantRoles.ReturnValue | undefined
  >()
  expectTypeOf(
    grantRoles.error,
  ).toEqualTypeOf<Actions.token.grantRoles.ErrorType | null>()
  expectTypeOf(grantRoles.variables).toEqualTypeOf<
    Actions.token.grantRoles.Parameters<typeof config> | undefined
  >()
  expectTypeOf(grantRoles.context).toEqualTypeOf<Context | undefined>()

  grantRoles.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.grantRoles.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.grantRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.grantRoles.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.grantRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.grantRoles.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.grantRoles.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.grantRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.grantRolesSync.Parameters<
    typeof config
  >

  const grantRolesSync = token.useGrantRolesSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.grantRolesSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.grantRolesSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.grantRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.grantRolesSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.grantRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.grantRolesSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.grantRolesSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.grantRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(grantRolesSync.data).toEqualTypeOf<
    Actions.token.grantRolesSync.ReturnValue | undefined
  >()
  expectTypeOf(
    grantRolesSync.error,
  ).toEqualTypeOf<Actions.token.grantRolesSync.ErrorType | null>()
  expectTypeOf(grantRolesSync.variables).toEqualTypeOf<
    Actions.token.grantRolesSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(grantRolesSync.context).toEqualTypeOf<Context | undefined>()

  grantRolesSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.grantRolesSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.grantRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.grantRolesSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.grantRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.grantRolesSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.grantRolesSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.grantRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useMint', () => {
  const variables = {} as Actions.token.mint.Parameters<typeof config>

  const mint = token.useMint({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.mint.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.mint.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.mint.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.mint.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.mint.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.mint.ReturnValue | undefined
        >()
        expectTypeOf(error).toEqualTypeOf<Actions.token.mint.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.mint.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(mint.data).toEqualTypeOf<
    Actions.token.mint.ReturnValue | undefined
  >()
  expectTypeOf(mint.error).toEqualTypeOf<Actions.token.mint.ErrorType | null>()
  expectTypeOf(mint.variables).toEqualTypeOf<
    Actions.token.mint.Parameters<typeof config> | undefined
  >()
  expectTypeOf(mint.context).toEqualTypeOf<Context | undefined>()

  mint.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.mint.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.mint.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.mint.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.mint.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.mint.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.token.mint.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.mint.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.mintSync.Parameters<typeof config>

  const mintSync = token.useMintSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.mintSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.mintSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.mintSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.mintSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.mintSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.mintSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.mintSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.mintSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(mintSync.data).toEqualTypeOf<
    Actions.token.mintSync.ReturnValue | undefined
  >()
  expectTypeOf(
    mintSync.error,
  ).toEqualTypeOf<Actions.token.mintSync.ErrorType | null>()
  expectTypeOf(mintSync.variables).toEqualTypeOf<
    Actions.token.mintSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(mintSync.context).toEqualTypeOf<Context | undefined>()

  mintSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.mintSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.mintSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.mintSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.mintSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.mintSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.mintSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.mintSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('usePause', () => {
  const variables = {} as Actions.token.pause.Parameters<typeof config>

  const pause = token.usePause({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.pause.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.pause.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.pause.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.pause.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.pause.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.pause.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.pause.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.pause.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(pause.data).toEqualTypeOf<
    Actions.token.pause.ReturnValue | undefined
  >()
  expectTypeOf(
    pause.error,
  ).toEqualTypeOf<Actions.token.pause.ErrorType | null>()
  expectTypeOf(pause.variables).toEqualTypeOf<
    Actions.token.pause.Parameters<typeof config> | undefined
  >()
  expectTypeOf(pause.context).toEqualTypeOf<Context | undefined>()

  pause.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.pause.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.pause.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.pause.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.pause.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.pause.ReturnValue | undefined
      >()
      expectTypeOf(error).toEqualTypeOf<Actions.token.pause.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.pause.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.pauseSync.Parameters<typeof config>

  const pauseSync = token.usePauseSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.pauseSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.pauseSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.pauseSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.pauseSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.pauseSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.pauseSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.pauseSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.pauseSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(pauseSync.data).toEqualTypeOf<
    Actions.token.pauseSync.ReturnValue | undefined
  >()
  expectTypeOf(
    pauseSync.error,
  ).toEqualTypeOf<Actions.token.pauseSync.ErrorType | null>()
  expectTypeOf(pauseSync.variables).toEqualTypeOf<
    Actions.token.pauseSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(pauseSync.context).toEqualTypeOf<Context | undefined>()

  pauseSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.pauseSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.pauseSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.pauseSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.pauseSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.pauseSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.pauseSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.pauseSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useRenounceRoles', () => {
  const variables = {} as Actions.token.renounceRoles.Parameters<typeof config>

  const renounceRoles = token.useRenounceRoles({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRoles.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.renounceRoles.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.renounceRoles.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.renounceRoles.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.renounceRoles.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(renounceRoles.data).toEqualTypeOf<
    Actions.token.renounceRoles.ReturnValue | undefined
  >()
  expectTypeOf(
    renounceRoles.error,
  ).toEqualTypeOf<Actions.token.renounceRoles.ErrorType | null>()
  expectTypeOf(renounceRoles.variables).toEqualTypeOf<
    Actions.token.renounceRoles.Parameters<typeof config> | undefined
  >()
  expectTypeOf(renounceRoles.context).toEqualTypeOf<Context | undefined>()

  renounceRoles.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.renounceRoles.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.renounceRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.renounceRoles.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.renounceRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.renounceRoles.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.renounceRoles.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.renounceRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.renounceRolesSync.Parameters<
    typeof config
  >

  const renounceRolesSync = token.useRenounceRolesSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRolesSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.renounceRolesSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.renounceRolesSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.renounceRolesSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.renounceRolesSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.renounceRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(renounceRolesSync.data).toEqualTypeOf<
    Actions.token.renounceRolesSync.ReturnValue | undefined
  >()
  expectTypeOf(
    renounceRolesSync.error,
  ).toEqualTypeOf<Actions.token.renounceRolesSync.ErrorType | null>()
  expectTypeOf(renounceRolesSync.variables).toEqualTypeOf<
    Actions.token.renounceRolesSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(renounceRolesSync.context).toEqualTypeOf<Context | undefined>()

  renounceRolesSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.renounceRolesSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.renounceRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.renounceRolesSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.renounceRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.renounceRolesSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.renounceRolesSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.renounceRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useRevokeRoles', () => {
  const variables = {} as Actions.token.revokeRoles.Parameters<typeof config>

  const revokeRoles = token.useRevokeRoles({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRoles.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.revokeRoles.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.revokeRoles.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.revokeRoles.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.revokeRoles.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRoles.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(revokeRoles.data).toEqualTypeOf<
    Actions.token.revokeRoles.ReturnValue | undefined
  >()
  expectTypeOf(
    revokeRoles.error,
  ).toEqualTypeOf<Actions.token.revokeRoles.ErrorType | null>()
  expectTypeOf(revokeRoles.variables).toEqualTypeOf<
    Actions.token.revokeRoles.Parameters<typeof config> | undefined
  >()
  expectTypeOf(revokeRoles.context).toEqualTypeOf<Context | undefined>()

  revokeRoles.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.revokeRoles.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.revokeRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.revokeRoles.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.revokeRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.revokeRoles.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.revokeRoles.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.revokeRoles.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.revokeRolesSync.Parameters<
    typeof config
  >

  const revokeRolesSync = token.useRevokeRolesSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRolesSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.revokeRolesSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.revokeRolesSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.revokeRolesSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.revokeRolesSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.revokeRolesSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(revokeRolesSync.data).toEqualTypeOf<
    Actions.token.revokeRolesSync.ReturnValue | undefined
  >()
  expectTypeOf(
    revokeRolesSync.error,
  ).toEqualTypeOf<Actions.token.revokeRolesSync.ErrorType | null>()
  expectTypeOf(revokeRolesSync.variables).toEqualTypeOf<
    Actions.token.revokeRolesSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(revokeRolesSync.context).toEqualTypeOf<Context | undefined>()

  revokeRolesSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.revokeRolesSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.revokeRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.revokeRolesSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.revokeRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.revokeRolesSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.revokeRolesSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.revokeRolesSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useSetRoleAdmin', () => {
  const variables = {} as Actions.token.setRoleAdmin.Parameters<typeof config>

  const setRoleAdmin = token.useSetRoleAdmin({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdmin.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setRoleAdmin.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdmin.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.setRoleAdmin.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdmin.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.setRoleAdmin.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setRoleAdmin.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdmin.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setRoleAdmin.data).toEqualTypeOf<
    Actions.token.setRoleAdmin.ReturnValue | undefined
  >()
  expectTypeOf(
    setRoleAdmin.error,
  ).toEqualTypeOf<Actions.token.setRoleAdmin.ErrorType | null>()
  expectTypeOf(setRoleAdmin.variables).toEqualTypeOf<
    Actions.token.setRoleAdmin.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setRoleAdmin.context).toEqualTypeOf<Context | undefined>()

  setRoleAdmin.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.setRoleAdmin.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.setRoleAdmin.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.setRoleAdmin.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.setRoleAdmin.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.setRoleAdmin.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.setRoleAdmin.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.setRoleAdmin.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.setRoleAdminSync.Parameters<
    typeof config
  >

  const setRoleAdminSync = token.useSetRoleAdminSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdminSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setRoleAdminSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdminSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.setRoleAdminSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdminSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.setRoleAdminSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setRoleAdminSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.setRoleAdminSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setRoleAdminSync.data).toEqualTypeOf<
    Actions.token.setRoleAdminSync.ReturnValue | undefined
  >()
  expectTypeOf(
    setRoleAdminSync.error,
  ).toEqualTypeOf<Actions.token.setRoleAdminSync.ErrorType | null>()
  expectTypeOf(setRoleAdminSync.variables).toEqualTypeOf<
    Actions.token.setRoleAdminSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setRoleAdminSync.context).toEqualTypeOf<Context | undefined>()

  setRoleAdminSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.setRoleAdminSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.setRoleAdminSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.setRoleAdminSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.setRoleAdminSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.setRoleAdminSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.setRoleAdminSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.setRoleAdminSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useSetSupplyCap', () => {
  const variables = {} as Actions.token.setSupplyCap.Parameters<typeof config>

  const setSupplyCap = token.useSetSupplyCap({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCap.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setSupplyCap.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.setSupplyCap.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.setSupplyCap.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setSupplyCap.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCap.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setSupplyCap.data).toEqualTypeOf<
    Actions.token.setSupplyCap.ReturnValue | undefined
  >()
  expectTypeOf(
    setSupplyCap.error,
  ).toEqualTypeOf<Actions.token.setSupplyCap.ErrorType | null>()
  expectTypeOf(setSupplyCap.variables).toEqualTypeOf<
    Actions.token.setSupplyCap.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setSupplyCap.context).toEqualTypeOf<Context | undefined>()

  setSupplyCap.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.setSupplyCap.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.setSupplyCap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.setSupplyCap.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.setSupplyCap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.setSupplyCap.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.setSupplyCap.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.setSupplyCap.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.setSupplyCapSync.Parameters<
    typeof config
  >

  const setSupplyCapSync = token.useSetSupplyCapSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCapSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setSupplyCapSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCapSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.setSupplyCapSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCapSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.setSupplyCapSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.setSupplyCapSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.setSupplyCapSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(setSupplyCapSync.data).toEqualTypeOf<
    Actions.token.setSupplyCapSync.ReturnValue | undefined
  >()
  expectTypeOf(
    setSupplyCapSync.error,
  ).toEqualTypeOf<Actions.token.setSupplyCapSync.ErrorType | null>()
  expectTypeOf(setSupplyCapSync.variables).toEqualTypeOf<
    Actions.token.setSupplyCapSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(setSupplyCapSync.context).toEqualTypeOf<Context | undefined>()

  setSupplyCapSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.setSupplyCapSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.setSupplyCapSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.setSupplyCapSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.setSupplyCapSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.setSupplyCapSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.setSupplyCapSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.setSupplyCapSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useTransfer', () => {
  const variables = {} as Actions.token.transfer.Parameters<typeof config>

  const transfer = token.useTransfer({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.transfer.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.transfer.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.transfer.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.transfer.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.transfer.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.transfer.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.transfer.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.transfer.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(transfer.data).toEqualTypeOf<
    Actions.token.transfer.ReturnValue | undefined
  >()
  expectTypeOf(
    transfer.error,
  ).toEqualTypeOf<Actions.token.transfer.ErrorType | null>()
  expectTypeOf(transfer.variables).toEqualTypeOf<
    Actions.token.transfer.Parameters<typeof config> | undefined
  >()
  expectTypeOf(transfer.context).toEqualTypeOf<Context | undefined>()

  transfer.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.transfer.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.transfer.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.transfer.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.transfer.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.transfer.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.transfer.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.transfer.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.transferSync.Parameters<
    typeof config
  >

  const transferSync = token.useTransferSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.transferSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.transferSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.transferSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.transferSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.transferSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.transferSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.transferSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.transferSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(transferSync.data).toEqualTypeOf<
    Actions.token.transferSync.ReturnValue | undefined
  >()
  expectTypeOf(
    transferSync.error,
  ).toEqualTypeOf<Actions.token.transferSync.ErrorType | null>()
  expectTypeOf(transferSync.variables).toEqualTypeOf<
    Actions.token.transferSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(transferSync.context).toEqualTypeOf<Context | undefined>()

  transferSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.transferSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.transferSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.transferSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.transferSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.transferSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.transferSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.transferSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useUnpause', () => {
  const variables = {} as Actions.token.unpause.Parameters<typeof config>

  const unpause = token.useUnpause({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.unpause.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.unpause.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.unpause.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(data).toEqualTypeOf<Actions.token.unpause.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.unpause.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.unpause.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.unpause.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.unpause.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(unpause.data).toEqualTypeOf<
    Actions.token.unpause.ReturnValue | undefined
  >()
  expectTypeOf(
    unpause.error,
  ).toEqualTypeOf<Actions.token.unpause.ErrorType | null>()
  expectTypeOf(unpause.variables).toEqualTypeOf<
    Actions.token.unpause.Parameters<typeof config> | undefined
  >()
  expectTypeOf(unpause.context).toEqualTypeOf<Context | undefined>()

  unpause.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.unpause.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.unpause.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.unpause.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.unpause.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.unpause.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.unpause.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.unpause.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync = {} as Actions.token.unpauseSync.Parameters<
    typeof config
  >

  const unpauseSync = token.useUnpauseSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.unpauseSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(error).toEqualTypeOf<Actions.token.unpauseSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.unpauseSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.unpauseSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.unpauseSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.unpauseSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.unpauseSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.unpauseSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(unpauseSync.data).toEqualTypeOf<
    Actions.token.unpauseSync.ReturnValue | undefined
  >()
  expectTypeOf(
    unpauseSync.error,
  ).toEqualTypeOf<Actions.token.unpauseSync.ErrorType | null>()
  expectTypeOf(unpauseSync.variables).toEqualTypeOf<
    Actions.token.unpauseSync.Parameters<typeof config> | undefined
  >()
  expectTypeOf(unpauseSync.context).toEqualTypeOf<Context | undefined>()

  unpauseSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(error).toEqualTypeOf<Actions.token.unpauseSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.unpauseSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(data).toEqualTypeOf<Actions.token.unpauseSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.unpauseSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.unpauseSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.unpauseSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.unpauseSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('usePrepareUpdateQuoteToken', () => {
  const variables = {} as Actions.token.prepareUpdateQuoteToken.Parameters<
    typeof config
  >

  const prepareUpdateQuoteToken = token.usePrepareUpdateQuoteToken({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.prepareUpdateQuoteToken.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(prepareUpdateQuoteToken.data).toEqualTypeOf<
    Actions.token.prepareUpdateQuoteToken.ReturnValue | undefined
  >()
  expectTypeOf(
    prepareUpdateQuoteToken.error,
  ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ErrorType | null>()
  expectTypeOf(prepareUpdateQuoteToken.variables).toEqualTypeOf<
    Actions.token.prepareUpdateQuoteToken.Parameters<typeof config> | undefined
  >()
  expectTypeOf(prepareUpdateQuoteToken.context).toEqualTypeOf<
    Context | undefined
  >()

  prepareUpdateQuoteToken.mutate(variables, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.prepareUpdateQuoteToken.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.prepareUpdateQuoteToken.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.prepareUpdateQuoteToken.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })

  const variablesSync =
    {} as Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>

  const prepareUpdateQuoteTokenSync = token.usePrepareUpdateQuoteTokenSync({
    config,
    mutation: {
      onMutate(variables) {
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
        >()
        return contextValue
      },
      onError(error, variables, context) {
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ErrorType>()
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
      onSuccess(data, variables, context) {
        expectTypeOf(
          data,
        ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ReturnValue>()
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context>()
      },
      onSettled(data, error, variables, context) {
        expectTypeOf(data).toEqualTypeOf<
          Actions.token.prepareUpdateQuoteTokenSync.ReturnValue | undefined
        >()
        expectTypeOf(
          error,
        ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ErrorType | null>()
        expectTypeOf(variables).toExtend<
          Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
        >()
        expectTypeOf(context).toEqualTypeOf<Context | undefined>()
      },
    },
  })

  expectTypeOf(prepareUpdateQuoteTokenSync.data).toEqualTypeOf<
    Actions.token.prepareUpdateQuoteTokenSync.ReturnValue | undefined
  >()
  expectTypeOf(
    prepareUpdateQuoteTokenSync.error,
  ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ErrorType | null>()
  expectTypeOf(prepareUpdateQuoteTokenSync.variables).toEqualTypeOf<
    | Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
    | undefined
  >()
  expectTypeOf(prepareUpdateQuoteTokenSync.context).toEqualTypeOf<
    Context | undefined
  >()

  prepareUpdateQuoteTokenSync.mutate(variablesSync, {
    onError(error, variables, context) {
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ErrorType>()
      expectTypeOf(variables).toExtend<
        Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(
        data,
      ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ReturnValue>()
      expectTypeOf(variables).toExtend<
        Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<
        Actions.token.prepareUpdateQuoteTokenSync.ReturnValue | undefined
      >()
      expectTypeOf(
        error,
      ).toEqualTypeOf<Actions.token.prepareUpdateQuoteTokenSync.ErrorType | null>()
      expectTypeOf(variables).toExtend<
        Actions.token.prepareUpdateQuoteTokenSync.Parameters<typeof config>
      >()
      expectTypeOf(context).toEqualTypeOf<Context | undefined>()
    },
  })
})

test('useWatchAdminRole', () => {
  token.useWatchAdminRole({
    config,
    enabled: true,
    onRoleAdminUpdated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchApprove', () => {
  token.useWatchApprove({
    config,
    enabled: true,
    onApproval(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchBurn', () => {
  token.useWatchBurn({
    config,
    enabled: true,
    onBurn(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchCreate', () => {
  token.useWatchCreate({
    config,
    enabled: true,
    onTokenCreated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchMint', () => {
  token.useWatchMint({
    config,
    enabled: true,
    onMint(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchRole', () => {
  token.useWatchRole({
    config,
    enabled: true,
    onRoleUpdated(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchTransfer', () => {
  token.useWatchTransfer({
    config,
    enabled: true,
    onTransfer(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})

test('useWatchUpdateQuoteToken', () => {
  token.useWatchUpdateQuoteToken({
    config,
    enabled: true,
    onUpdateQuoteToken(args, log) {
      expectTypeOf(args).toExtend<object>()
      expectTypeOf(log).toExtend<object>()
    },
  })
})
