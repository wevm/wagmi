import {
  type ReconnectError,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
} from '../actions/reconnect.js'
import type { Config } from '../config.js'
import type { Evaluate } from '../types/utils.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type ReconnectOptions = ReconnectParameters

export function reconnectMutationOptions(
  config: Config,
  options: ReconnectOptions = {},
) {
  return {
    getVariables(variables) {
      return {
        connectors: (variables?.connectors ?? options.connectors)!,
      }
    },
    mutationFn(variables) {
      return reconnect(config, variables)
    },
    mutationKey: ['reconnect', options],
  } as const satisfies MutationOptions<
    ReconnectData,
    ReconnectError,
    ReconnectVariables,
    ReconnectParameters
  >
}

export type ReconnectData = Evaluate<ReconnectReturnType>

export type ReconnectVariables = ReconnectParameters | undefined

export type ReconnectMutate<context = unknown> = Mutate<
  ReconnectData,
  ReconnectError,
  ReconnectVariables,
  context,
  ReconnectVariables
>

export type ReconnectMutateAsync<context = unknown> = MutateAsync<
  ReconnectData,
  ReconnectError,
  ReconnectVariables,
  context,
  ReconnectVariables
>
