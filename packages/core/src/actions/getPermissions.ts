import {
  type GetPermissionsErrorType as viem_GetPermissionsErrorType,
  type GetPermissionsReturnType as viem_GetPermissionsReturnType,
  getPermissions as viem_getPermissions,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type GetPermissionsParameters = ConnectorParameter

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
export async function getPermissions(
  config: Config,
  parameters: GetPermissionsParameters = {},
): Promise<GetPermissionsReturnType> {
  const { connector } = parameters

  const client = await getConnectorClient(config, { connector })

  const action = getAction(client, viem_getPermissions, 'getPermissions')
  return action({})
}
