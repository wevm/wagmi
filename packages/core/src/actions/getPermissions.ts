import {
  type GetPermissionsErrorType as viem_GetPermissionsErrorType,
  type GetPermissionsReturnType as viem_GetPermissionsReturnType,
  getPermissions as viem_getPermissions,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type GetPermissionsParameters<config extends Config = Config> = Compute<
  ConnectorParameter & ChainIdParameter<config>
>

export type GetPermissionsReturnType = viem_GetPermissionsReturnType

export type GetPermissionsErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_GetPermissionsErrorType

/** https://wagmi.sh/core/api/actions/getPermissions */
export async function getPermissions<config extends Config>(
  config: config,
  parameters: GetPermissionsParameters<config> = {},
): Promise<GetPermissionsReturnType> {
  const { connector, chainId } = parameters
  const client = await getConnectorClient(config, { chainId, connector })
  const action = getAction(client, viem_getPermissions, 'getPermissions')
  return action({})
}
