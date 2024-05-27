import {
  type GetFeeHistoryErrorType as viem_GetFeeHistoryErrorType,
  type GetFeeHistoryParameters as viem_GetFeeHistoryParameters,
  type GetFeeHistoryReturnType as viem_GetFeeHistoryReturnType,
  getFeeHistory as viem_getFeeHistory,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetFeeHistoryParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<viem_GetFeeHistoryParameters & ChainIdParameter<config, chainId>>

export type GetFeeHistoryReturnType = viem_GetFeeHistoryReturnType

export type GetFeeHistoryErrorType = viem_GetFeeHistoryErrorType

/** https://wagmi.sh/core/api/actions/getFeeHistory */
export function getFeeHistory<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: GetFeeHistoryParameters<config, chainId>,
): Promise<GetFeeHistoryReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getFeeHistory, 'getFeeHistory')
  return action(rest)
}
