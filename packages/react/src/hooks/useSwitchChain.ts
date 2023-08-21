import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister, SwitchChainError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSwitchChainParameters<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
> = Evaluate<
  UseMutationOptions<
    SwitchChainData<config, config['chains'][number]['id']>,
    SwitchChainError,
    SwitchChainVariables<config, config['chains'][number]['id']>,
    context
  > &
    ConfigParameter<config>
>

export type UseSwitchChainReturnType<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SwitchChainData<config, config['chains'][number]['id']>,
    SwitchChainError,
    SwitchChainVariables<config, config['chains'][number]['id']>,
    context
  > & {
    chains: config['chains']
    switchChain: SwitchChainMutate<config, context>
    switchChainAsync: SwitchChainMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/hooks/useSwitchChain */
export function useSwitchChain<config extends Config, context = unknown>(
  parameters: UseSwitchChainParameters<config, context> = {},
): UseSwitchChainReturnType<config, context> {
  const config = useConfig(parameters)
  const mutationOptions = switchChainMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseSwitchChainReturnType<config, context>
  return {
    ...result,
    chains: config.chains,
    switchChain: mutate as Return['switchChain'],
    switchChainAsync: mutateAsync as Return['switchChainAsync'],
  }
}
