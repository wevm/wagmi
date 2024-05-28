import type { MutationOptions } from '@tanstack/query-core'

import {
  type ConnectErrorType,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from '../actions/connect.js'
import type { Config } from '../createConfig.js'

import type { Mutate, MutateAsync } from './types.js'

export function connectMutationOptions<config extends Config>(config: config) {
  return {
    mutationFn(variables) {
      return connect(config, variables)
    },
    mutationKey: ['connect'],
  } as const satisfies MutationOptions<
    ConnectData<config>,
    ConnectErrorType,
    ConnectVariables<config>
  >
}

export type ConnectData<config extends Config> = ConnectReturnType<config>

export type ConnectVariables<config extends Config> = ConnectParameters<config>

export type ConnectMutate<config extends Config, context = unknown> = Mutate<
  ConnectData<config>,
  ConnectErrorType,
  ConnectVariables<config>,
  context
>

export type ConnectMutateAsync<
  config extends Config,
  context = unknown,
> = MutateAsync<
  ConnectData<config>,
  ConnectErrorType,
  ConnectVariables<config>,
  context
>
