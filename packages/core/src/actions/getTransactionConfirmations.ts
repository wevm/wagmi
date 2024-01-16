import {
  type GetTransactionConfirmationsErrorType as viem_GetTransactionConfirmationsErrorType,
  type GetTransactionConfirmationsParameters as viem_GetTransactionConfirmationsParameters,
  type GetTransactionConfirmationsReturnType as viem_GetTransactionConfirmationsReturnType,
  getTransactionConfirmations as viem_getTransactionConfirmations,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type GetTransactionConfirmationsParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<
  viem_GetTransactionConfirmationsParameters & ChainIdParameter<config, chainId>
>

export type GetTransactionConfirmationsReturnType =
  viem_GetTransactionConfirmationsReturnType

export type GetTransactionConfirmationsErrorType =
  viem_GetTransactionConfirmationsErrorType

/** https://wagmi.sh/core/api/actions/getTransactionConfirmations */
export function getTransactionConfirmations<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetTransactionConfirmationsParameters<config, chainId>,
): Promise<GetTransactionConfirmationsReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_getTransactionConfirmations(client, rest)
}
