import { type MutationOptions } from '@tanstack/query-core'

import { type Config, type Connector } from '../config.js'
import type { BaseError } from '../errors/base.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { IsUndefined, Pretty } from '../types/utils.js'

export type SwitchAccountParameters = {
  connector: Connector
}

export type SwitchAccountError = ConnectorNotFoundError | BaseError | Error

/** https://wagmi.sh/core/actions/switchAccount */
export async function switchAccount(
  config: Config,
  { connector }: SwitchAccountParameters,
) {
  const connections = config.state.connections
  if (!connections.has(connector.uid)) throw new ConnectorNotFoundError()

  config.storage?.setItem('recentConnectorId', connector.id)
  config.setState((x) => ({
    ...x,
    current: connector.uid,
  }))
}

///////////////////////////////////////////////////////////////////////////
// TanStack Query

export type SwitchAccountMutationData = void
export type SwitchAccountMutationVariables<
  connector extends SwitchAccountParameters['connector'] | undefined,
> = Pretty<
  IsUndefined<connector> extends false
    ? { connector?: SwitchAccountParameters['connector'] | undefined }
    : { connector: SwitchAccountParameters['connector'] | undefined }
>
export type SwitchAccountMutationParameters<
  connector extends SwitchAccountParameters['connector'] | undefined,
> = Pretty<{
  connector?: connector | SwitchAccountParameters['connector'] | undefined
}>

/** https://wagmi.sh/core/actions/switchAccount#tanstack-query */
export const switchAccountMutationOptions = <
  connector extends SwitchAccountParameters['connector'] | undefined,
>(
  config: Config,
  { connector }: SwitchAccountMutationParameters<connector>,
) =>
  ({
    mutationFn(variables) {
      const connector_ = variables.connector ?? connector
      if (!connector_) throw new Error('"connector" is required')
      return switchAccount(config, { connector: connector_ })
    },
    mutationKey: ['switchAccount', { connector }],
  }) as const satisfies MutationOptions<
    SwitchAccountMutationData,
    SwitchAccountError,
    SwitchAccountMutationVariables<connector>
  >
