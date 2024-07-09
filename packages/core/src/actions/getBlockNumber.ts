import {
  type GetBlockNumberErrorType as viem_GetBlockNumberErrorType,
  type GetBlockNumberParameters as viem_GetBlockNumberParameters,
  type GetBlockNumberReturnType as viem_GetBlockNumberReturnType,
  getBlockNumber as viem_getBlockNumber,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<viem_GetBlockNumberParameters & ChainIdParameter<config, chainId>>

export type GetBlockNumberReturnType = viem_GetBlockNumberReturnType

export type GetBlockNumberErrorType = viem_GetBlockNumberErrorType

/** https://wagmi.sh/core/api/actions/getBlockNumber */
export function getBlockNumber<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: GetBlockNumberParameters<config, chainId> = {},
): Promise<GetBlockNumberReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getBlockNumber, 'getBlockNumber')
  return action(rest)
}
