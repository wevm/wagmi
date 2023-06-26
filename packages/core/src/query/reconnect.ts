import {
  type ReconnectError,
  type ReconnectParameters,
  type ReconnectReturnType,
  reconnect,
} from '../actions/reconnect.js'
import type { Config, Connector } from '../config.js'
import { type CreateConnectorFn } from '../connector.js'
import type { Evaluate } from '../types/utils.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type ReconnectOptions = Evaluate<{
  connectors?:
    | [CreateConnectorFn | Connector, ...(CreateConnectorFn | Connector)[]]
    | undefined
}>

export const reconnectMutationOptions = (
  config: Config,
  options: ReconnectOptions = {},
) =>
  ({
    getVariables(variables) {
      return {
        connectors: (variables?.connectors ?? options.connectors)!,
      }
    },
    mutationFn(variables) {
      return reconnect(config, variables)
    },
    mutationKey: ['reconnect', options],
  }) as const satisfies MutationOptions<
    ReconnectData,
    ReconnectError,
    ReconnectVariables,
    ReconnectParameters
  >

export type ReconnectData = Evaluate<ReconnectReturnType>

export type ReconnectVariables =
  | Evaluate<{
      connectors?:
        | [CreateConnectorFn | Connector, ...(CreateConnectorFn | Connector)[]]
        | undefined
    }>
  | undefined

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
