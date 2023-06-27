import {
  type DisconnectError,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
} from '../actions/disconnect.js'
import type { Config } from '../config.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type DisconnectOptions = DisconnectParameters

export function disconnectMutationOptions(
  config: Config,
  options: DisconnectOptions = {},
) {
  return {
    getVariables(variables) {
      return {
        connector: (variables?.connector ?? options.connector)!,
      }
    },
    mutationFn(variables) {
      return disconnect(config, variables)
    },
    mutationKey: ['disconnect', options],
  } as const satisfies MutationOptions<
    DisconnectData,
    DisconnectError,
    DisconnectVariables
  >
}

export type DisconnectData = DisconnectReturnType

export type DisconnectVariables = DisconnectParameters | undefined

export type DisconnectMutate<context = unknown> = Mutate<
  DisconnectData,
  DisconnectError,
  DisconnectVariables,
  context,
  DisconnectVariables
>

export type DisconnectMutateAsync<context = unknown> = MutateAsync<
  DisconnectData,
  DisconnectError,
  DisconnectVariables,
  context,
  DisconnectVariables
>
