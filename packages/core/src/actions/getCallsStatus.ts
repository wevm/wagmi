import {
  type GetCallsStatusErrorType as viem_GetCallsStatusErrorType,
  type GetCallsStatusParameters as viem_GetCallsStatusParameters,
  type GetCallsStatusReturnType as viem_GetCallsStatusReturnType,
  getCallsStatus as viem_getCallsStatus,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ConnectorParameter } from '../types/properties.js'
import { getAction } from '../utils/getAction.js'
import { getConnectorClient } from './getConnectorClient.js'

export type GetCallsStatusParameters = viem_GetCallsStatusParameters &
  ConnectorParameter

export type GetCallsStatusReturnType = viem_GetCallsStatusReturnType

export type GetCallsStatusErrorType = viem_GetCallsStatusErrorType

/** https://wagmi.sh/core/api/actions/getCallsStatus */
export async function getCallsStatus<config extends Config>(
  config: config,
  parameters: GetCallsStatusParameters,
): Promise<GetCallsStatusReturnType> {
  const { connector, id } = parameters
  const client = await getConnectorClient(config, { connector })
  const action = getAction(client, viem_getCallsStatus, 'getCallsStatus')
  return action({ id })
}
