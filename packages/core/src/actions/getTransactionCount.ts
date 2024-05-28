import {
  type GetTransactionCountErrorType as viem_GetTransactionCountErrorType,
  type GetTransactionCountParameters as viem_GetTransactionCountParameters,
  type GetTransactionCountReturnType as viem_GetTransactionCountReturnType,
  getTransactionCount as viem_getTransactionCount,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetTransactionCountParameters<config extends Config = Config> =
  Evaluate<ChainIdParameter<config> & viem_GetTransactionCountParameters>

export type GetTransactionCountReturnType = viem_GetTransactionCountReturnType

export type GetTransactionCountErrorType = viem_GetTransactionCountErrorType

/** https://wagmi.sh/core/api/actions/getTransactionCount */
export async function getTransactionCount<config extends Config>(
  config: config,
  parameters: GetTransactionCountParameters<config>,
): Promise<GetTransactionCountReturnType> {
  const { address, blockNumber, blockTag, chainId } = parameters

  const client = config.getClient({ chainId })
  const action = getAction(
    client,
    viem_getTransactionCount,
    'getTransactionCount',
  )
  return action(blockNumber ? { address, blockNumber } : { address, blockTag })
}
