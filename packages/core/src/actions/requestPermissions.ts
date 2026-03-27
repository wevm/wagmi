import {
  type RequestPermissionsErrorType as viem_RequestPermissionsErrorType,
  type RequestPermissionsParameters as viem_RequestPermissionsParameters,
  type RequestPermissionsReturnType as viem_RequestPermissionsReturnType,
  requestPermissions as viem_requestPermissions,
} from 'viem/actions'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type RequestPermissionsParameters = Compute<
  viem_RequestPermissionsParameters & ConnectorParameter
>

export type RequestPermissionsReturnType = viem_RequestPermissionsReturnType

export type RequestPermissionsErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_RequestPermissionsErrorType

/** https://wagmi.sh/core/api/actions/requestPermissions */
export async function requestPermissions<config extends Config>(
  config: config,
  parameters: RequestPermissionsParameters,
): Promise<RequestPermissionsReturnType> {
  const { connector, ...rest } = parameters
  const client = await getConnectorClient(config, { connector })

  const action = getAction(
    client,
    viem_requestPermissions,
    'requestPermissions',
  )
  return action(rest)
}
