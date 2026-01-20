import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import {
  type ConnectErrorType,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from '../actions/connect.js'
import type { CreateConnectorFn } from '../connectors/createConnector.js'
import type { Config, Connector } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type ConnectOptions<
  config extends Config,
  context = unknown,
> = MutationParameter<
  ConnectData<config, config['connectors'][number], boolean>,
  ConnectErrorType,
  ConnectVariables<config, config['connectors'][number], boolean>,
  context
>

export function connectMutationOptions<config extends Config, context>(
  config: config,
  options: ConnectOptions<config, context> = {},
): ConnectMutationOptions<config> {
  return {
    ...(options.mutation as any),
    mutationFn: async (variables) => {
      return connect(config, variables)
    },
    mutationKey: ['connect'],
  }
}

export type ConnectMutationOptions<config extends Config> = MutationOptions<
  ConnectData<config, config['connectors'][number], boolean>,
  ConnectErrorType,
  ConnectVariables<config, config['connectors'][number], boolean>
>

export type ConnectData<
  config extends Config,
  connector extends Connector | CreateConnectorFn,
  withCapabilities extends boolean,
> = ConnectReturnType<config, connector, withCapabilities>

export type ConnectVariables<
  config extends Config,
  connector extends Connector | CreateConnectorFn,
  withCapabilities extends boolean,
> = ConnectParameters<config, connector, withCapabilities>

export type ConnectMutate<config extends Config, context = unknown> = <
  connector extends
    | config['connectors'][number]
    | Connector
    | CreateConnectorFn,
  withCapabilities extends boolean = false,
>(
  variables: ConnectVariables<config, connector, withCapabilities>,
  options?:
    | Compute<
        MutateOptions<
          ConnectData<config, connector, withCapabilities>,
          ConnectErrorType,
          Compute<ConnectVariables<config, connector, withCapabilities>>,
          context
        >
      >
    | undefined,
) => void

export type ConnectMutateAsync<config extends Config, context = unknown> = <
  connector extends
    | config['connectors'][number]
    | Connector
    | CreateConnectorFn,
  withCapabilities extends boolean = false,
>(
  variables: ConnectVariables<config, connector, withCapabilities>,
  options?:
    | Compute<
        MutateOptions<
          ConnectData<config, connector, withCapabilities>,
          ConnectErrorType,
          Compute<ConnectVariables<config, connector, withCapabilities>>,
          context
        >
      >
    | undefined,
) => Promise<ConnectData<config, connector, withCapabilities>>
