import type { Account } from 'viem'
import {
  type GetCapabilitiesErrorType as viem_GetCapabilitiesErrorType,
  type GetCapabilitiesParameters as viem_GetCapabilitiesParameters,
  type GetCapabilitiesReturnType as viem_GetCapabilitiesReturnType,
  getCapabilities as viem_getCapabilities,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ConnectorParameter } from '../types/properties.js'
import { getConnectorClient } from './getConnectorClient.js'

export type GetCapabilitiesParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = viem_GetCapabilitiesParameters<chainId> & ConnectorParameter

export type GetCapabilitiesReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
> = viem_GetCapabilitiesReturnType<chainId>

export type GetCapabilitiesErrorType = viem_GetCapabilitiesErrorType

/** https://wagmi.sh/core/api/actions/getCapabilities */
export async function getCapabilities<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: GetCapabilitiesParameters<config, chainId> = {},
): Promise<GetCapabilitiesReturnType<config, chainId>> {
  const { account, chainId, connector } = parameters
  const client = await getConnectorClient(config, { account, connector })
  return viem_getCapabilities(client as any, {
    account: account as Account,
    chainId,
  })
}
