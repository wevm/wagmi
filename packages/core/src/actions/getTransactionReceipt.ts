import type { Chain } from 'viem'
import {
  type GetTransactionReceiptErrorType as viem_GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters as viem_GetTransactionReceiptParameters,
  type GetTransactionReceiptReturnType as viem_GetTransactionReceiptReturnType,
  getTransactionReceipt as viem_getTransactionReceipt,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute, IsNarrowable } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  viem_GetTransactionReceiptParameters & ChainIdParameter<config, chainId>
>

export type GetTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = Compute<
  {
    [key in keyof chains]: viem_GetTransactionReceiptReturnType<
      IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined
    > & { chainId: chains[key]['id'] }
  }[number]
>

export type GetTransactionReceiptErrorType = viem_GetTransactionReceiptErrorType

/** https://wagmi.sh/core/api/actions/getTransactionReceipt */
export async function getTransactionReceipt<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetTransactionReceiptParameters<config>,
): Promise<GetTransactionReceiptReturnType<config, chainId>> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(
    client,
    viem_getTransactionReceipt,
    'getTransactionReceipt',
  )
  return action(rest) as unknown as Promise<
    GetTransactionReceiptReturnType<config, chainId>
  >
}
