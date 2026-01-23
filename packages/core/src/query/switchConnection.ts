import type { MutationOptions } from '@tanstack/query-core'
import {
  type SwitchConnectionErrorType,
  type SwitchConnectionParameters,
  type SwitchConnectionReturnType,
  switchConnection,
} from '../actions/switchConnection.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export type SwitchConnectionOptions<
  config extends Config,
  context = unknown,
> = MutationParameter<
  SwitchConnectionData<config>,
  SwitchConnectionErrorType,
  SwitchConnectionVariables,
  context
>

export function switchConnectionMutationOptions<config extends Config, context>(
  config: config,
  options: SwitchConnectionOptions<config, context> = {},
): SwitchConnectionMutationOptions<config> {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return switchConnection(config, variables)
    },
    mutationKey: ['switchConnection'],
  }
}

export type SwitchConnectionMutationOptions<config extends Config> =
  MutationOptions<
    SwitchConnectionData<config>,
    SwitchConnectionErrorType,
    SwitchConnectionVariables
  >

export type SwitchConnectionData<config extends Config> = Compute<
  SwitchConnectionReturnType<config>
>

export type SwitchConnectionVariables = Compute<SwitchConnectionParameters>

export type SwitchConnectionMutate<
  config extends Config,
  context = unknown,
> = Mutate<
  SwitchConnectionData<config>,
  SwitchConnectionErrorType,
  SwitchConnectionVariables,
  context
>

export type SwitchConnectionMutateAsync<
  config extends Config,
  context = unknown,
> = MutateAsync<
  SwitchConnectionData<config>,
  SwitchConnectionErrorType,
  SwitchConnectionVariables,
  context
>
