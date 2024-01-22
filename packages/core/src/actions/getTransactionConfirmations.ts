import { type Chain } from 'viem'
import {
  type GetTransactionConfirmationsErrorType as viem_GetTransactionConfirmationsErrorType,
  type GetTransactionConfirmationsParameters as viem_GetTransactionConfirmationsParameters,
  type GetTransactionConfirmationsReturnType as viem_GetTransactionConfirmationsReturnType,
  getTransactionConfirmations as viem_getTransactionConfirmations,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type SelectChains } from '../types/chain.js'
import { type ChainIdParameter } from '../types/properties.js'

export type GetTransactionConfirmationsParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: viem_GetTransactionConfirmationsParameters<
    chains[key]
  > &
    ChainIdParameter<config, chainId>
}[number]

export type GetTransactionConfirmationsReturnType =
  viem_GetTransactionConfirmationsReturnType

export type GetTransactionConfirmationsErrorType =
  viem_GetTransactionConfirmationsErrorType

/** https://wagmi.sh/core/api/actions/getTransactionConfirmations */
export function getTransactionConfirmations<
  config extends Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
>(
  config: config,
  parameters: GetTransactionConfirmationsParameters<config, chainId>,
): Promise<GetTransactionConfirmationsReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_getTransactionConfirmations(
    client,
    rest as viem_GetTransactionConfirmationsParameters,
  )
}
