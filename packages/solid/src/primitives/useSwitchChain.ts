import { createMutation as useMutation } from '@tanstack/solid-query'
import type {
  Config,
  ResolvedRegister,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainOptions,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useSwitchChain */
export function useSwitchChain<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSwitchChain.Parameters<config, context> = () => ({}),
): useSwitchChain.ReturnType<config, context> {
  const config = useConfig(parameters)
  const mutation = useMutation(() =>
    switchChainMutationOptions(config(), parameters()),
  )
  return mutation as useSwitchChain.ReturnType<config, context>
}

export namespace useSwitchChain {
  export type Parameters<
    config extends Config = Config,
    context = unknown,
  > = Accessor<SolidParameters<config, context>>

  export type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = Compute<
    UseMutationReturnType<
      SwitchChainData<config, config['chains'][number]['id']>,
      SwitchChainErrorType,
      SwitchChainVariables<config, config['chains'][number]['id']>,
      context,
      SwitchChainMutate<config, context>,
      SwitchChainMutateAsync<config, context>
    >
  >

  export type SolidParameters<
    config extends Config = Config,
    context = unknown,
  > = Compute<ConfigParameter<config> & SwitchChainOptions<config, context>>
}
