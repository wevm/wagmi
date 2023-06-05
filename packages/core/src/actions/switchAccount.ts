import { type MutationOptions } from '@tanstack/query-core'

import { type Config, type Connector } from '../config.js'
import type { BaseError } from '../errors/base.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { Pretty } from '../types/utils.js'

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
export type SwitchAccountMutationVariables = Pretty<{
  connector?: Connector | undefined
}>
export type SwitchAccountMutationParameters =
  Pretty<SwitchAccountMutationVariables>

/** https://wagmi.sh/core/actions/switchAccount#tanstack-query */
export const switchAccountMutationOptions = (
  config: Config,
  { connector }: SwitchAccountMutationParameters,
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
    SwitchAccountMutationVariables
  >
