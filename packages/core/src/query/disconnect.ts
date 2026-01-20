import type { MutationOptions } from '@tanstack/query-core'
import {
  type DisconnectErrorType,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
} from '../actions/disconnect.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Mutate, MutateAsync } from './types.js'

export type DisconnectOptions<context = unknown> = MutationParameter<
  DisconnectData,
  DisconnectErrorType,
  DisconnectVariables,
  context
>

export function disconnectMutationOptions<config extends Config, context>(
  config: config,
  options: DisconnectOptions<context> = {},
): DisconnectMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn: async (variables) => {
      return disconnect(config, variables)
    },
    mutationKey: ['disconnect'],
  }
}

export type DisconnectMutationOptions = MutationOptions<
  DisconnectData,
  DisconnectErrorType,
  DisconnectVariables
>

export type DisconnectData = DisconnectReturnType

export type DisconnectVariables = DisconnectParameters | undefined

export type DisconnectMutate<context = unknown> = Mutate<
  DisconnectData,
  DisconnectErrorType,
  DisconnectVariables,
  context
>

export type DisconnectMutateAsync<context = unknown> = MutateAsync<
  DisconnectData,
  DisconnectErrorType,
  DisconnectVariables,
  context
>
