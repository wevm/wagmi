'use client'
import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainOptions,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useChains } from './useChains.js'
import { useConfig } from './useConfig.js'

export type UseSwitchChainParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SwitchChainOptions<config, context>>

export type UseSwitchChainReturnType<
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
  > & {
    /** @deprecated use `useChains` instead */
    chains: config['chains']
    /** @deprecated use `mutate` instead */
    switchChain: SwitchChainMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    switchChainAsync: SwitchChainMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSwitchChain */
export function useSwitchChain<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchChainParameters<config, context> = {},
): UseSwitchChainReturnType<config, context> {
  const config = useConfig(parameters)
  const options = switchChainMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSwitchChainReturnType<config, context>
  return {
    ...(mutation as Return),
    chains: useChains({ config }) as unknown as config['chains'],
    switchChain: mutation.mutate as Return['mutate'],
    switchChainAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
