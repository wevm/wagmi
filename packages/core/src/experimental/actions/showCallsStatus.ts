import {
  type ShowCallsStatusErrorType as viem_ShowCallsStatusErrorType,
  type ShowCallsStatusParameters as viem_ShowCallsStatusParameters,
  type ShowCallsStatusReturnType as viem_ShowCallsStatusReturnType,
  showCallsStatus as viem_showCallsStatus,
} from 'viem/experimental'

import { getConnectorClient } from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type { ConnectorParameter } from '../../types/properties.js'

export type ShowCallsStatusParameters = viem_ShowCallsStatusParameters &
  ConnectorParameter

export type ShowCallsStatusReturnType = viem_ShowCallsStatusReturnType

export type ShowCallsStatusErrorType = viem_ShowCallsStatusErrorType

/** https://wagmi.sh/core/api/actions/showCallsStatus */
export async function showCallsStatus<config extends Config>(
  config: config,
  parameters: ShowCallsStatusParameters,
): Promise<ShowCallsStatusReturnType> {
  const { connector, id } = parameters
  const client = await getConnectorClient(config, { connector })
  return viem_showCallsStatus(client, { id })
}
