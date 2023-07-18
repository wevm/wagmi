import type { MutationOptions } from '@tanstack/query-core'

import {
  type DisconnectError,
  type DisconnectParameters,
  type DisconnectReturnType,
  disconnect,
} from '../actions/disconnect.js'
import type { Config } from '../config.js'
import type { Mutate, MutateAsync } from './types.js'

export function disconnectMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return disconnect(config, variables)
    },
    mutationKey: ['disconnect'],
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
  context
>

export type DisconnectMutateAsync<context = unknown> = MutateAsync<
  DisconnectData,
  DisconnectError,
  DisconnectVariables,
  context
>
