'use client'

import { FunctionedParams, createMutation } from '@tanstack/solid-query'
import type {
  Config,
  Connector,
  ResolvedRegister,
  SwitchAccountErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchAccountData,
  type SwitchAccountMutate,
  type SwitchAccountMutateAsync,
  type SwitchAccountVariables,
  switchAccountMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.ts'
import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../utils/query.ts'
import { createConfig } from './createConfig.ts'
import { createConnections } from './createConnections.ts'

export type CreateSwitchAccountParameters<
  config extends Config = Config,
  context = unknown,
> = FunctionedParams<Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | ReturnType<CreateMutationParameters<
          SwitchAccountData<config>,
          SwitchAccountErrorType,
          SwitchAccountVariables,
          context
        >>
      | undefined
  }
>>

export type CreateSwitchAccountReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  {mutation: CreateMutationReturnType<
    SwitchAccountData<config>,
    SwitchAccountErrorType,
    SwitchAccountVariables,
    context
  >} & {
    connectors: readonly Connector[]
    switchAccount: SwitchAccountMutate<config, context>
    switchAccountAsync: SwitchAccountMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/CreateSwitchAccount */
export function createSwitchAccount<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: CreateSwitchAccountParameters<config, context> = ()=>({}),
): CreateSwitchAccountReturnType<config, context> {
  const { mutation: mutationParams } = parameters()

  const _config = createConfig(parameters)

  const mutationOptions = switchAccountMutationOptions(_config)
  const mutation = createMutation(()=>({
    ...mutationParams,
    ...mutationOptions,
  }))

  return {
    mutation,
    connectors: createConnections().connections.map((connection) => connection.connector),
    switchAccount: mutation.mutate,
    switchAccountAsync: mutation.mutateAsync,
  }
}
