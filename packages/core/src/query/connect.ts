import {
  type ConnectError,
  type ConnectParameters,
  type ConnectReturnType,
  connect,
} from '../actions/connect.js'
import { type Config, type Connector } from '../config.js'
import { type CreateConnectorFn } from '../connector.js'

import type { Evaluate, Omit, PartialBy } from '../types/utils.js'
import { mergeWithOutUndefined } from '../utils/mergeWithOutUndefined.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type ConnectOptions<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
> = Evaluate<
  Omit<ConnectParameters<config>, 'connector'> & {
    connector?: connector | ConnectParameters<config>['connector'] | undefined
  }
>

export function connectMutationOptions<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
>(config: config, options: ConnectOptions<config, connector> = {}) {
  return {
    getVariables(variables) {
      const merged = mergeWithOutUndefined(options, variables)
      return {
        ...merged,
        connector: merged.connector!,
      }
    },
    mutationFn(variables) {
      return connect(config, variables)
    },
    mutationKey: ['connect', options],
  } as const satisfies MutationOptions<
    ConnectData<config>,
    ConnectError,
    ConnectVariables<config, undefined>,
    ConnectParameters
  >
}

export type ConnectData<config extends Config> = ConnectReturnType<config>

export type ConnectVariables<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
> =
  | Evaluate<
      PartialBy<
        ConnectParameters<config>,
        connector extends Connector | CreateConnectorFn ? 'connector' : never
      >
    >
  | (connector extends Connector | CreateConnectorFn ? undefined : never)

export type ConnectMutate<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
  context = unknown,
> = Mutate<
  ConnectData<config>,
  ConnectError,
  ConnectVariables<config, undefined>,
  context,
  ConnectVariables<config, connector>
>

export type ConnectMutateAsync<
  config extends Config,
  connector extends Connector | CreateConnectorFn | undefined,
  context = unknown,
> = MutateAsync<
  ConnectData<config>,
  ConnectError,
  ConnectVariables<config, undefined>,
  context,
  ConnectVariables<config, connector>
>
