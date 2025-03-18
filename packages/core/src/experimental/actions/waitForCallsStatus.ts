import {
  type WaitForCallsStatusErrorType as viem_WaitForCallsStatusErrorType,
  type WaitForCallsStatusParameters as viem_WaitForCallsStatusParameters,
  type WaitForCallsStatusReturnType as viem_WaitForCallsStatusReturnType,
  waitForCallsStatus as viem_waitForCallsStatus,
} from 'viem/experimental'

import { getConnectorClient } from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type { ConnectorParameter } from '../../types/properties.js'

export type WaitForCallsStatusParameters = viem_WaitForCallsStatusParameters &
  ConnectorParameter

export type WaitForCallsStatusReturnType = viem_WaitForCallsStatusReturnType

export type WaitForCallsStatusErrorType = viem_WaitForCallsStatusErrorType

/** https://wagmi.sh/core/api/actions/waitForCallsStatus */
export async function waitForCallsStatus<config extends Config>(
  config: config,
  parameters: WaitForCallsStatusParameters,
): Promise<WaitForCallsStatusReturnType> {
  const { connector, id } = parameters
  const client = await getConnectorClient(config, { connector })
  return viem_waitForCallsStatus(client, { id })
}
