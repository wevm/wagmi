import {
  type SwitchChainError,
  type SwitchChainParameters,
  type SwitchChainReturnType,
  switchChain,
} from '../actions/switchChain.js'
import { type Config } from '../config.js'

import type { Evaluate, IsUndefined } from '../types/utils.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type SwitchChainOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<{
  chainId?: chainId | SwitchChainParameters['chainId'] | undefined
}>

export const switchChainMutationOptions = <
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: SwitchChainOptions<config, chainId>,
) =>
  ({
    getVariables(variables) {
      return {
        chainId: (variables?.chainId ?? options.chainId)!,
      }
    },
    mutationFn(variables) {
      return switchChain(config, variables) as any
    },
    mutationKey: ['switchChain', options],
  }) as const satisfies MutationOptions<
    SwitchChainData<config, chainId>,
    SwitchChainError,
    SwitchChainParameters,
    SwitchChainParameters
  >

export type SwitchChainData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  SwitchChainReturnType<
    config,
    chainId extends undefined ? config['chains'][number]['id'] : chainId
  >
>

export type SwitchChainVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<
  IsUndefined<chainId> extends false
    ? { chainId?: config['chains'][number]['id'] | undefined }
    : { chainId: config['chains'][number]['id'] }
>

export type SwitchChainMutate<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = Mutate<
  SwitchChainData<config, chainId>,
  SwitchChainError,
  SwitchChainVariables<config, chainId>,
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
  SwitchChainVariables<config, chainId>,
  context,
  SwitchChainVariables<config, chainId>
>
