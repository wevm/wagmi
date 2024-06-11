import type { Account } from 'viem'
import {
  type GetCapabilitiesErrorType as viem_GetCapabilitiesErrorType,
  type GetCapabilitiesParameters as viem_GetCapabilitiesParameters,
  type GetCapabilitiesReturnType as viem_GetCapabilitiesReturnType,
  getCapabilities as viem_getCapabilities,
} from 'viem/experimental'

import { getConnectorClient } from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type { ConnectorParameter } from '../../types/properties.js'

export type GetCapabilitiesParameters =
  viem_GetCapabilitiesParameters<Account> & ConnectorParameter

export type GetCapabilitiesReturnType = viem_GetCapabilitiesReturnType

export type GetCapabilitiesErrorType = viem_GetCapabilitiesErrorType

/** https://wagmi.sh/core/api/actions/getCapabilities */
export async function getCapabilities<config extends Config>(
  config: config,
  parameters: GetCapabilitiesParameters = {},
): Promise<GetCapabilitiesReturnType> {
  const { account, connector } = parameters
  const client = await getConnectorClient(config, { account, connector })
  return viem_getCapabilities(client as any, { account: account as Account })
}
