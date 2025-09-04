import {
  type GetStorageAtErrorType as viem_GetStorageAtErrorType,
  type GetStorageAtParameters as viem_GetStorageAtParameters,
  type GetStorageAtReturnType as viem_GetStorageAtReturnType,
  getStorageAt as viem_getStorageAt,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetStorageAtParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<viem_GetStorageAtParameters & ChainIdParameter<config, chainId>>

export type GetStorageAtReturnType = viem_GetStorageAtReturnType

export type GetStorageAtErrorType = viem_GetStorageAtErrorType

/** https://wagmi.sh/core/api/actions/getStorageAt */
export function getStorageAt<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: GetStorageAtParameters<config, chainId>,
): Promise<GetStorageAtReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getStorageAt, 'getStorageAt')
  return action(rest)
}
