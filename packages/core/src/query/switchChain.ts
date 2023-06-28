import {
  type SwitchChainError,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from '../actions/switchChain.js'
import { type Config } from '../config.js'

import type { Evaluate, Omit, PartialBy } from '../types/utils.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type SwitchChainOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  Omit<SwitchChainParameters<config>, 'chainId'> & {
    chainId?: chainId | SwitchChainParameters<config>['chainId'] | undefined
  }
>

export function switchChainMutationOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(config: config, options: SwitchChainOptions<config, chainId> = {}) {
  return {
    getVariables(variables) {
      return {
        chainId: (variables?.chainId ?? options.chainId)!,
      }
    },
    mutationFn(variables) {
      return switchChain(config, variables)
    },
    mutationKey: ['switchChain', options],
  } as const satisfies MutationOptions<
    SwitchChainData<config, chainId>,
    SwitchChainError,
    SwitchChainVariables<config, undefined>,
    SwitchChainParameters
  >
}

export type SwitchChainData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  SwitchChainReturnType<
    config,
    chainId extends undefined ? config['chains'][number]['id'] : number
  >
>

export type SwitchChainVariables<
  config extends Config,
  chainId extends number | undefined,
> =
  | Evaluate<
      PartialBy<
        SwitchChainParameters<config>,
        chainId extends number ? 'chainId' : never
      >
    >
  | (chainId extends number ? undefined : never)

export type SwitchChainMutate<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = Mutate<
  SwitchChainData<config, chainId>,
  SwitchChainError,
  SwitchChainVariables<config, undefined>,
  context,
  SwitchChainVariables<config, chainId>
>

export type SwitchChainMutateAsync<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = MutateAsync<
  SwitchChainData<config, chainId>,
  SwitchChainError,
  SwitchChainVariables<config, undefined>,
  context,
  SwitchChainVariables<config, chainId>
>
