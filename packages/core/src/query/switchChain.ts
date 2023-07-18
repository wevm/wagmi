import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SwitchChainError,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from '../actions/switchChain.js'
import { type Config } from '../config.js'
import type { Evaluate } from '../types/utils.js'

export function switchChainMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return switchChain(config, variables)
    },
    mutationKey: ['switchChain'],
  } as const satisfies MutationOptions<
    SwitchChainData<config, config['chains'][number]['id']>,
    SwitchChainError,
    SwitchChainVariables<config, config['chains'][number]['id']>
  >
}

export type SwitchChainData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  SwitchChainReturnType<
    config,
    chainId extends config['chains'][number]['id']
      ? number extends config['chains'][number]['id']
        ? config['chains'][number]['id']
        : chainId
      : config['chains'][number]['id']
  >
>

export type SwitchChainVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  SwitchChainParameters<
    config,
    chainId extends config['chains'][number]['id']
      ? chainId
      : config['chains'][number]['id']
  >
>

export type SwitchChainMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'] | undefined,
>(
  variables: SwitchChainVariables<config, chainId>,
  options?: Evaluate<
    MutateOptions<
      SwitchChainData<config, chainId>,
      SwitchChainError,
      Evaluate<SwitchChainVariables<config, chainId>>,
      context
    >
  >,
) => void

export type SwitchChainMutateAsync<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'] | undefined,
>(
  variables: SwitchChainVariables<config, chainId>,
  options?: Evaluate<
    MutateOptions<
      SwitchChainData<config, chainId>,
      SwitchChainError,
      Evaluate<SwitchChainVariables<config, chainId>>,
      context
    >
  >,
) => Promise<SwitchChainData<config, chainId>>
