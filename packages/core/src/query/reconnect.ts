import type { MutationOptions } from '@tanstack/query-core'

import {
  type ReconnectErrorType,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
} from '../actions/reconnect.js'
import type { Config } from '../createConfig.js'
import type { Evaluate } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export function reconnectMutationOptions(config: Config) {
  return {
    mutationFn(variables) {
      return reconnect(config, variables)
    },
    mutationKey: ['reconnect'],
  } as const satisfies MutationOptions<
    ReconnectData,
    ReconnectErrorType,
    ReconnectVariables
  >
}

export type ReconnectData = Evaluate<ReconnectReturnType>

export type ReconnectVariables = ReconnectParameters | undefined

export type ReconnectMutate<context = unknown> = Mutate<
  ReconnectData,
  ReconnectErrorType,
  ReconnectVariables,
  context
>

export type ReconnectMutateAsync<context = unknown> = MutateAsync<
  ReconnectData,
  ReconnectErrorType,
  ReconnectVariables,
  context
>
