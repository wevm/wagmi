import {
  type GetGasPriceErrorType as viem_GetGasPriceErrorType,
  type GetGasPriceReturnType as viem_GetGasPriceReturnType,
  getGasPrice as viem_getGasPrice,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetGasPriceParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<ChainIdParameter<config, chainId>>

export type GetGasPriceReturnType = viem_GetGasPriceReturnType

export type GetGasPriceErrorType = viem_GetGasPriceErrorType

/** https://wagmi.sh/core/api/actions/getGasPrice */
export function getGasPrice<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: GetGasPriceParameters<config, chainId> = {},
): Promise<GetGasPriceReturnType> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getGasPrice, 'getGasPrice')
  return action({})
}
