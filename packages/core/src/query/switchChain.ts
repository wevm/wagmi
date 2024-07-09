import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SwitchChainErrorType,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from '../actions/switchChain.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

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
    SwitchChainErrorType,
    SwitchChainVariables<config, config['chains'][number]['id']>
  >
}

export type SwitchChainData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<SwitchChainReturnType<config, chainId>>

export type SwitchChainVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<SwitchChainParameters<config, chainId>>

export type SwitchChainMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
>(
  variables: SwitchChainVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SwitchChainData<config, chainId>,
          SwitchChainErrorType,
          Compute<SwitchChainVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => void

export type SwitchChainMutateAsync<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
>(
  variables: SwitchChainVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SwitchChainData<config, chainId>,
          SwitchChainErrorType,
          Compute<SwitchChainVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SwitchChainData<config, chainId>>
