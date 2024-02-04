'use client'

import { FunctionedParams, createMutation } from '@tanstack/solid-query'
import type {
  Config,
  ResolvedRegister,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../utils/query.js'
import { createConfig } from './createConfig.js'

export type CreateSwitchChainParameters<
  config extends Config = Config,
  context = unknown,
> = FunctionedParams<Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | ReturnType<CreateMutationParameters<
          SwitchChainData<config, config['chains'][number]['id']>,
          SwitchChainErrorType,
          SwitchChainVariables<config, config['chains'][number]['id']>,
          context
        >>
      | undefined
  }
>>

export type CreateSwitchChainReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  { mutation: CreateMutationReturnType<
    SwitchChainData<config, config['chains'][number]['id']>,
    SwitchChainErrorType,
    SwitchChainVariables<config, config['chains'][number]['id']>,
    context
  > } & {
    chains: config['chains']
    switchChain: SwitchChainMutate<config, context>
    switchChainAsync: SwitchChainMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSwitchChain */
export function createSwitchChain<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: CreateSwitchChainParameters<config, context> = ()=>({}),
): CreateSwitchChainReturnType<config, context> {
  const { mutation: mutationParams } = parameters()

  const { config: _config } = createConfig(parameters)

  const mutationOptions = switchChainMutationOptions(_config)
  const mutation = createMutation(()=>({
    ...mutationParams,
    ...mutationOptions,
  }))

  type Return = CreateSwitchChainReturnType<config, context>
  return {
    mutation,
    chains: _config.chains,
    switchChain: mutation.mutate as Return['switchChain'],
    switchChainAsync: mutation.mutateAsync as Return['switchChainAsync'],
  }
}
